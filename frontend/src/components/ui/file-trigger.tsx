import React from "react"
import { FileTrigger } from "react-aria-components"

import { Button } from "@/components/ui/button"

export function FileTriggerButton() {
  // Demo to show how to get file name to display.
  let [file, setFile] = React.useState<string[]>()

  return (
    <FileTrigger
      onSelect={(e) => {
        if (!e) return
        let files = Array.from(e)
        let filenames = files.map((file) => file.name)
        setFile(filenames)
      }}
    >
      <Button>Select a file</Button>
      {file && file}
    </FileTrigger>
  )
}
export { FileTriggerButton }
