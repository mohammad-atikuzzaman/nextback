import getCommentsOfPost from "@/utils/fetchCommentsApi";
import React from "react";
import Comment from "./Comment";

const Comments = async ({ id }) => {
  const comments = await getCommentsOfPost(id);

  return (
    <section className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Comments <span>{comments.length}</span>
      </h2>

      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        <ul className="space-y-6">
          {comments.map(({ id, name, email, body }) => (
            <Comment key={id} id={id} name={name} email={email} body={body} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Comments;
