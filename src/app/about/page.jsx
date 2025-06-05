import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

const AboutPage = async () => {
  const cookieStore = await cookies();

  const res = await fetch("https://nextback-eta.vercel.app/api/posts", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-semibold">
        🔒 You must be logged in to view this page.
      </div>
    );
  }

  const data = await res.json();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        📝 All Posts
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post) => (
          <article
            key={post._id}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col"
          >
            <div className="mb-3">
              <Image
                src={post.photo}
                alt={post.title}
                width={400}
                height={200}
                className="w-full h-40 object-cover rounded"
              />
            </div>
            <h2 className="font-semibold text-xl text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.body}</p>
            <p className="text-xs text-gray-400 mt-auto">✍️ By {post.author}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default AboutPage;
