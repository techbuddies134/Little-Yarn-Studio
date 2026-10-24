"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!title || !content) return alert("Title aur content bharein");
    // Abhi ke liye sirf home par wapas bhej rahe hain
    alert("Post ban gayi! (abhi database connect nahi hai)");
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        className="w-full border p-2 mb-3 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  );
}