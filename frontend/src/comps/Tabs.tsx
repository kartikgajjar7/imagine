import React from "react";
import { Code, Eye } from "lucide-react";

interface TabsProps {
  activeTab: "editor" | "preview";
  onTabChange: (tab: "editor" | "preview") => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="h-12 flex items-center px-4 bg-gray-800 border-b border-gray-700">
      <button
        onClick={() => onTabChange("editor")}
        className={`flex items-center px-4 py-2 rounded-md mr-2 transition-colors ${
          activeTab === "editor"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:bg-gray-700/50"
        }`}
      >
        <Code className="w-4 h-4 mr-2" />
        Editor
      </button>
      <button
        onClick={() => onTabChange("preview")}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          activeTab === "preview"
            ? "bg-gray-700 text-gray-100"
            : "text-gray-400 hover:bg-gray-700/50"
        }`}
      >
        <Eye className="w-4 h-4 mr-2" />
        Preview
      </button>
    </div>
  );
};
