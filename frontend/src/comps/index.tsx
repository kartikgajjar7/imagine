import React from "react";
import { FileTree } from "./FileTree";
import { MainContent } from "./MainContent";
import { Files, Settings } from "lucide-react";
import { FileNode } from "../types/index";



export const FileExplorer: React.FC = ({ files, webcontainer }) => {
  const [selectedFile, setSelectedFile] = React.useState<FileNode | null>(null);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === "file") {
      setSelectedFile(file);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 w-full">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-700 bg-gray-800">
        {/* Sidebar Header */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center">
            <Files className="w-5 h-5 mr-2 text-blue-400" />
            <span className="font-medium text-gray-200">Explorer</span>
          </div>
          <button className="p-1 rounded hover:bg-gray-700">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* File Tree */}
        <div className="p-2 text-gray-300">
          <FileTree
            files={files}
            onFileSelect={handleFileSelect}
            isDark={true}
          />
        </div>
      </div>

      
      <MainContent files={files} webcontainer={webcontainer} selectedFile={selectedFile} />
    </div>
  );
};
