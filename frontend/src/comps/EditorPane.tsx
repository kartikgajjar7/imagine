import React from "react";
import Editor from "@monaco-editor/react";
import { FileNode } from "../types/index";

interface EditorPaneProps {
  file: FileNode | null;
}



export const EditorPane: React.FC<EditorPaneProps> = ({ file ,files , webcontainer }) => {
  function findFilePath(fileName: string, structure: any, currentPath: string = ''): string | null {
    // Handle direct files in current level
    if (Array.isArray(structure)) {
      for (const item of structure) {
        if (item.type === 'file' && item.name === fileName) {
          return `${currentPath}${item.name}`;
        }
        if (item.type === 'directory') {
          const foundPath = findFilePath(fileName, item.children, `${currentPath}${item.name}/`);
          if (foundPath) return foundPath;
        }
      }
    } else if (typeof structure === 'object') {
      for (const [name, item] of Object.entries(structure)) {
        if (item.type === 'file' && name === fileName) {
          return `${currentPath}${name}`;
        }
        if (item.type === 'directory' && item.children) {
          const foundPath = findFilePath(fileName, item.children, `${currentPath}${name}/`);
          if (foundPath) return foundPath;
        }
      }
    }
    
    return null;
  }
  
 
  const  handleeditorchanges = async(value) => {
  
  const editedfile =findFilePath(file.name,files)

  await webcontainer.fs.writeFile(editedfile, value);
  
    }
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
        <p className="text-lg">Select a file to view its contents</p>
      </div>
    );
  }

  return (
    <Editor
      height="calc(100vh - 3rem)"
      defaultLanguage="typescript"
      onChange={handleeditorchanges}
      theme="vs-dark"
      value={file.content}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        renderValidationDecorations : "off",
        wordWrap: "on",
        readOnly: false,
        automaticLayout: true,
      }}
    />
  );
};
