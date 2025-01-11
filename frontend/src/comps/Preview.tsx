import React, { useEffect } from "react";

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content, webcontainer }) => {
  const [url, setUrl] = React.useState<string | null>(null);
  async function main() {
    const installProcess = await webcontainer.spawn("npm", ["install"]);

    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      })
    );
    await webcontainer.spawn("npm", ["run", "dev"]);

    // Wait for `server-ready` event
    webcontainer.on("server-ready", (port, url) => {
     
      setUrl(url);
    });
    // Wait for the process to complete
  }
  useEffect(() => {
    main();
  }, []);
  return (
    <div className="h-full bg-white">
      <iframe width={"100%"} height={"100%"} src={url} />
    </div>
  );
};
