import React, { useEffect, useState } from "react";

interface PreviewProps {
  content: string;
  webcontainer;
  load;
}

export const Preview: React.FC<PreviewProps> = ({
  content,
  webcontainer,
  load,
}) => {
  async function installDependencies() {
    // Install dependencies
    const installProcess = await webcontainer.spawn("npm", ["install"]);
    // Wait for install command to exit
    return installProcess.exit;
  }
  const [output, setOutput] = useState<string>("");
  const [Loading, setisloading] = useState(true);
  const [url, setUrl] = React.useState<string | null>(null);

  async function main() {
    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error("Installation failed");
    }
    webcontainer.on("server-ready", async (port, url) => {
      setisloading(false);
      setUrl(url);
    });
    console.log("ready");
    await webcontainer.spawn("npm", ["run", "dev"]);
  }

  useEffect(() => {
    main();
  }, []);
  return (
    <div className="h-full bg-white">
      {Loading ? (
        <div className="text-center h-full w-full flex-col flex items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
          <h1 className="text-xl font-semibold text-gray-700">
            Please go back to the <span className="text-blue-500">Editor</span>{" "}
            tab and then return to the
            <span className="text-blue-500"> Preview</span> tab.
          </h1>
          <p className="text-gray-500">
            {load
              ? "GENERATING YOUR APP"
              : "Downloading dependencies, this may take a moment..."}
          </p>
        </div>
      ) : (
        <iframe width={"100%"} height={"100%"} src={url} />
      )}
    </div>
  );
};
