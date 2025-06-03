import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

const PostCard = ({ post }) => {
  return (
    <article
      className="group rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-100 flex flex-col justify-between h-full"
      key={post.id}
    >
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post?.title}
        </h3>

        {/* Body preview */}
        <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-line">
          {post?.body}
        </p>
      </div>

      {/* Call to action */}
      <div className="pt-4 mt-auto">
        <Link
          href={`/post/${post.id}`}
          className="inline-flex items-center text-indigo-600 font-medium text-sm hover:underline transition"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
