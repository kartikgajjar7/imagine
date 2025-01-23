import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { useNavigate } from "react-router";
// import { Input } from "../components/ui/input";
import { FileTrigger } from "react-aria-components";
import { Input } from "../components/ui/input";
import { X } from "lucide-react";

import { Button } from "../components/ui/button";
export default function PlaceholdersAndVanishInputDemo() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   const previewUrl = URL.createObjectURL(file);
  //   console.log(previewUrl);
  //   setImage(file);

  //   setImagePreview(previewUrl);
  // };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(file); // Set the file in state
      setImagePreview(event.target?.result as string); // Directly use the original image's data URL
    };

    reader.readAsDataURL(file); // Read the file as a Data URL
  };
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
      navigate("/chat", { state: { prompt: prompt.trim(), image: image } });
    }, 1000);
  };
  return (
    <div className="h-full   w-screen flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white ">
        Explore the Future of Web Design with AI – Developed by kartik
      </h2>
      <div className="flex w-[700px]  flex-col gap-y-3">
        {image && (
          <div className="relative  inline-block">
            {/* Close Button */}
            <X
              onClick={() => {
                setImage(null); // Clear the selected image
                setImagePreview(null); // Reset the preview
              }}
              className=" absolute top-[-10px] left-[-7px] w-5 h-5 bg- text-white bg-zinc-600 rounded-full shadow-lg hover:cursor-pointer z-10"
            />
            {/* Image */}
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-[160px] max-h-[160px] object-contain rounded"
            />
          </div>
        )}
        <div className="flex  w-full items-center justify-center ">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <div
            className=" flex items-center justify-center
        "
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <Button
                type="button"
                className="cursor-pointer "
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Upload File
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
