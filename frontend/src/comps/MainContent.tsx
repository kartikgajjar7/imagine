import React, { useState } from "react";
import { EditorPane } from "./EditorPane";
import { Preview } from "./Preview";
import { Tabs } from "./Tabs";
import { FileNode } from "../types/index";

interface MainContentProps {
  files: FileNode[];
  selectedFile: FileNode | null;
}

export const MainContent: React.FC<MainContentProps> = ({
  selectedFile,
  files,
  setActiveTab,
  activeTab,
  webcontainer,
}) => {
  const [load, setload] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1">
        {activeTab === "editor" ? (
          <EditorPane
            setActiveTab={setActiveTab}
            files={files}
            file={selectedFile}
            webcontainer={webcontainer}
          />
        ) : (
          <Preview
            load={load}
            content={selectedFile?.content || ""}
            webcontainer={webcontainer}
          />
        )}
      </div>
    </div>
  );
};
