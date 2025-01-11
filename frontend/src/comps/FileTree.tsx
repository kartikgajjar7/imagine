import React from "react";
import { ChevronRight, ChevronDown, File, Folder } from "lucide-react";

interface FileNode {
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  level?: number;
  isDark?: boolean;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  onFileSelect,
  level = 0,
  isDark = true,
}) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set()
  );

  const toggleFolder = (name: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedFolders(newExpanded);
  };
  if (!files) return <h1>loading...</h1>;

  return (
    <div className="select-none">
      {files.map((file) => (
        <div key={file.name} style={{ paddingLeft: `${level * 16}px` }}>
          <div
            className={`flex items-center py-1 px-2 hover:bg-gray-700 rounded cursor-pointer ${
              file.type === "file"
                ? "text-gray-300"
                : "text-gray-100 font-medium"
            }`}
            onClick={() => {
              if (file.type === "directory") {
                toggleFolder(file.name);
              } else {
                onFileSelect(file);
              }
            }}
          >
            <span className="mr-1">
              {file.type === "directory" ? (
                expandedFolders.has(file.name) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )
              ) : null}
            </span>
            {file.type === "directory" ? (
              <Folder className="w-4 h-4 mr-2 text-blue-400" />
            ) : (
              <File className="w-4 h-4 mr-2 text-gray-400" />
            )}
            <span className="truncate">{file.name}</span>
          </div>
          {file.type === "directory" &&
            expandedFolders.has(file.name) &&
            file.children && (
              <FileTree
                files={file.children}
                onFileSelect={onFileSelect}
                level={level + 1}
                isDark={isDark}
              />
            )}
        </div>
      ))}
    </div>
  );
};
