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
    <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md shadow-lg p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        📝 Add a New Post
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Body</label>
          <textarea
            name="body"
            placeholder="Write your post content..."
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        {/* Author */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              disabled
              defaultValue={session?.data?.user?.name}
              className="w-full border border-gray-300 bg-gray-100 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              disabled
              defaultValue={session?.data?.user?.email}
              className="w-full border border-gray-300 bg-gray-100 rounded-md p-2"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="photo"
            className="block mb-1 font-medium text-gray-700"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 bg-white rounded-md p-2 text-sm text-gray-600 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold transition duration-200 ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {loading ? "Submitting..." : "🚀 Submit Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
