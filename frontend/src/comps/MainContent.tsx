import React from "react";
import { EditorPane } from "./EditorPane";
import { Preview } from "./Preview";
import { Tabs } from "./Tabs";
import { FileNode } from "../types/index";

interface MainContentProps {
  files :FileNode[]
  selectedFile: FileNode | null;
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedFile,
  files,
  webcontainer,
}) => {
  const [activeTab, setActiveTab] = React.useState<"editor" | "preview">(
    "editor"
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      {(() => {
        console.log(webcontainer, "MainContent");
        return null; // This ensures no UI is affected.
      })()}
      <div className="flex-1">
        {activeTab === "editor" ? (
          <EditorPane  files={files} file={selectedFile} webcontainer={webcontainer} />
        ) : (
          <Preview
            content={selectedFile?.content || ""}
            webcontainer={webcontainer}
          />
        )}
      </div>
    </div>
  );
};
