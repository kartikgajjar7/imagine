import { createRoot } from "react-dom/client";
import "./index.css";
import Chat from "./pages/Chat.tsx";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>
);
