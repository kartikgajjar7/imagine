import { useState } from "react";
import PlaceholdersAndVanishInputDemo from "./comps/box";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <PlaceholdersAndVanishInputDemo />;
}

export default App;
