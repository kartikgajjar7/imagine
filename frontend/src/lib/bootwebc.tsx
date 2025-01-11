import { useEffect } from "react";
import { useState } from "react";
import { WebContainer } from "@webcontainer/api";
export function createwebcontainer() {
  const [webcontainer, setwebcontainer] = useState<WebContainer | null>(null);
  async function main() {
    const webcontainer = await WebContainer.boot();
    setwebcontainer(webcontainer);
  }
  useEffect(() => {
    main();
  }, []);

  return webcontainer;
}
