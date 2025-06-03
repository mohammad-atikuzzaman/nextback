import Comments from "@/components/Comments";
import { getSpecificPostById } from "@/utils/fetchPostsApi";
import { ArrowLeft, User2, Hash } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;
  const post = await getSpecificPostById(id);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-100 to-white py-10 px-4 sm:px-6 md:px-8">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/posts"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="font-medium">Back to Posts</span>
        </Link>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-8 space-y-6 border border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>Post ID: {post.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="w-4 h-4" />
              <span>User ID: {post.userId}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-700 ">{post.body}</p>
        </div>
      </article>
      <Comments id={post.id} />
    </main>
  );
};

export default Page;
