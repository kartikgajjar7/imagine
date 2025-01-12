import { useLocation } from "react-router";
import parsexml from "../steps";
import axios from "axios";
import { Step } from "@/types";
import { StepsList } from "../comps/Steps";
import { useEffect, useState } from "react";
import { FileExplorer } from "../comps/index";
import { createwebcontainer } from "../lib/bootwebc";
function mergeArrays(arr1, arr2) {
  const merged = [...arr1]; // Start with all elements from the first array

  arr2.forEach((item2) => {
    const indexInArr1 = merged.findIndex(
      (item1) => item1.name === item2.name && item1.type === item2.type
    );

    // If the item exists in both arrays
    if (indexInArr1 !== -1) {
      const item1 = merged[indexInArr1];

      if (item1.type === "directory" && item2.type === "directory") {
        // If it's a directory, recursively merge the children
        item1.children = mergeArrays(item1.children, item2.children);
      } else if (item1.type === "file" && item2.type === "file") {
        // If it's a file, overwrite the content of item1 with item2 (array 1 has priority)
        item1.content = item2.content;
      }
    } else {
      // If the item only exists in the second array, just add it
      merged.push(item2);
    }
  });

  return merged;
}
interface FileNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileNode[];
}

function createFileTree(data: { path: string; code: string }[]): FileNode[] {
  const result: FileNode[] = [];

  data.forEach((item) => {
    const { path, code } = item;

    if (!path) return; // Skip items without a path

    const parts = path.split("/"); // Split the path into segments
    let currentLevel = result;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1; // Check if it's the last part (a file)
      let existing = currentLevel.find((entry) => entry.name === part);

      if (!existing) {
        existing = {
          name: part,
          type: isFile ? "file" : "directory",
          ...(isFile ? { content: code || "" } : { children: [] }),
        };
        currentLevel.push(existing);
      }

      if (!isFile) {
        currentLevel = existing.children as FileNode[]; // Descend into the directory
      }
    });
  });
  return result;
}

function convertToWebContainerFormat(
  input: InputFile[]
): WebContainerStructure {
  const result: WebContainerStructure = {};

  // Helper function for handling directories recursively
  function handleDirectory(directory: InputFile): WebContainerStructure {
    const directoryContent: WebContainerStructure = {};

    directory.children?.forEach((child) => {
      if (child.type === "file") {
        directoryContent[child.name] = {
          file: { contents: child.content || "" },
        };
      } else if (child.type === "directory") {
        directoryContent[child.name] = {
          directory: handleDirectory(child), // Recursively handle nested directories
        };
      }
    });

    return directoryContent;
  }

  input.forEach((item) => {
    if (item.type === "file") {
      result[item.name] = {
        file: { contents: item.content || "" },
      };
    } else if (item.type === "directory") {
      result[item.name] = {
        directory: handleDirectory(item),
      };
    }
  });

  return result;
}

export default function Chat() {
  const { prompt } = useLocation().state;
  const [llmm, setllmm] = useState();
  const [isloading, setisloading] = useState(true);
  const [steps, setSteps] = useState<Step[]>([]);
  const [filess, setfiles] = useState([]);
  const [textValue, setTextValue] = useState("");
  const webcontainer = createwebcontainer();
  useEffect(() => {
    axios
      .post("https://imagine-backend-dbwu.onrender.com/kartik/ask", { prompt })
      .then((res) => {
        const stepresult = parsexml(res.data.steps);
        setllmm(res.data);
        const basicfilesresult = parsexml(res.data.basicfiles);
        const steplistprompt = stepresult.map((step) => {
          return {
            id: step.id,
            title: step.title,
            description: step.description,
            code: step.code,
            status: step.status,
            path: step.path,
            type: step.type,
          };
        });
        const basicfilesprompt = basicfilesresult.map((step) => {
          return {
            id: step.id,
            title: step.title,
            description: step.description,
            code: step.code,
            status: step.status,
            path: step.path,
            type: step.type,
          };
        });
        setisloading(false);
        setSteps(steplistprompt);
        const addin = createFileTree(steplistprompt);
        const addin1 = createFileTree(basicfilesprompt);
        const Filesformat = mergeArrays(addin1, addin);
        setfiles(Filesformat);
      });
  }, []);
  useEffect(() => {
    const webcontainerStructure = convertToWebContainerFormat(filess);

    webcontainer?.mount(webcontainerStructure);
  }, [filess, webcontainer]);

  if (!filess || !webcontainer) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col">
        <StepsList steps={steps} isloading={isloading} />
        <div className="flex w-full flex-row items-center gap-2 rounded-2xl border border-gray-700/50 bg-gray-800/90 p-2">
          <textarea
            rows={1}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Your Message"
            className="flex-1 min-h-[40px] bg-transparent text-gray-100 placeholder-gray-400 resize-none border-0 focus:ring-0 focus:outline-none p-2 rounded-xl"
          />

          <button
            onClick={() => {
              console.log(llmm.basicfiles);
              console.log(textValue);
              axios
                .post("http://localhost:3000/kartik/ask", {
                  prompt: `${llmm.basicfiles} ${textValue}`,
                })
                .then((res) => {
                  setllmm(res.data);
                  const stepresult = parsexml(res.data.steps);
                  const basicfilesresult = parsexml(res.data.basicfiles);
                  const steplistprompt = stepresult.map((step) => ({
                    id: step.id,
                    title: step.title,
                    description: step.description,
                    code: step.code,
                    status: step.status,
                    path: step.path,
                    type: step.type,
                  }));
                  const basicfilesprompt = basicfilesresult.map((step) => ({
                    id: step.id,
                    title: step.title,
                    description: step.description,
                    code: step.code,
                    status: step.status,
                    path: step.path,
                    type: step.type,
                  }));
                  setisloading(false);
                  setSteps(steplistprompt);
                  const addin = createFileTree(steplistprompt);
                  const addin1 = createFileTree(basicfilesprompt);
                  const Filesformat = mergeArrays(addin1, addin);
                  setfiles(Filesformat);
                });
            }}
            className="p-2 rounded-xl text-gray-300 hover:bg-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <FileExplorer files={filess} webcontainer={webcontainer} />
    </div>
  );
}
