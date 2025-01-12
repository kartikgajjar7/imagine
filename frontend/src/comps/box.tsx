import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { useNavigate } from "react-router";

export default function PlaceholdersAndVanishInputDemo() {
  let navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const placeholders = [
    "Create a todo app with AI",
    "Build a word guessing game using AI",
    "Design a classic Snake game with AI",
    "Generate a personal blog website with AI",
    "Create a weather app with real-time data using AI",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      navigate("/chat", { state: { prompt: prompt.trim() } });
    }, 1000);
  };
  return (
    <div className="h-full   w-screen flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white ">
        Explore the Future of Web Design with AI – Developed by VOID
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
