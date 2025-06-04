import { cookies } from "next/headers";
import React from "react";

const AboutPage = async () => {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return <div>You must be logged in to view this page.</div>;
  }

  const data = await res.json();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Posts</h1>
      <ul className="space-y-2">
        {data.map((post) => (
          <li key={post._id} className="border p-4 rounded">
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.body}</p>
            <p className="text-xs text-gray-400">By {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
