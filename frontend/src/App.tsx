import PlaceholdersAndVanishInputDemo from "./comps/box";
import "./App.css";
import { useEffect } from "react";
import { AuroraBackground } from "./components/ui/aurora-background";
import { motion } from "framer-motion";
function App(): JSX.Element {
  null;

  useEffect(() => {
    document.title = "iimaginee - By kartik";
  }, []);
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative h-full w-full flex flex-col gap-4 items-center justify-center px-4"
      >
        <PlaceholdersAndVanishInputDemo />;
      </motion.div>
    </AuroraBackground>
  );
}

export default App;
