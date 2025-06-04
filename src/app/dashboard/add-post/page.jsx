"use client";
import { uploadImage } from "@/utils/uploadImage";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const AddPost = () => {
  const session = useSession();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const photo = await uploadImage(image);
    const form = e.target;
    const title = form.title.value;
    const body = form.body.value;
    const author = session?.data.user?.name;
    const email = session?.data.user?.email;

    if (!photo) {
      return alert("Need to upload photo");
    }
    const formData = {
      title,
      body,
      author,
      email,
      photo,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Post added successfully!");
      setLoading(false);
    } else {
      alert(data.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full bg-gray-700/10 backdrop-blur-sm rounded-lg min-h-screen mx-auto">
      <h2 className="text-xl font-bold mb-4">Add a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="border w-full p-2"
        />
        <textarea
          name="body"
          placeholder="Body"
          required
          className="border w-full p-2"
        />
        <input
          type="text"
          name="author"
          disabled
          defaultValue={session?.data?.user?.name}
          placeholder="Author"
          required
          className="border w-full p-2 bg-white"
        />
        <input
          type="email"
          name="email"
          disabled
          defaultValue={session?.data?.user?.email}
          placeholder="Author Email"
          required
          className="border w-full p-2 bg-white"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          name="photo"
          accept="image/*"
          id="photo"
          placeholder="photo"
          className="bg-gray-400 text-sm w-full text-gray-600 mr-4 p-1 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className={` text-white px-4 py-2 rounded ${
            loading
              ? "bg-gray-200 text-gray-700"
              : "bg-indigo-700 text-white hover:bg-indigo-600"
          }`}
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
