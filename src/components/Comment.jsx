"use client";
import React, { useState } from "react";
import { User, Mail, ChevronDown, ChevronUp } from "lucide-react";

const Comment = ({ id, name, email, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncate = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <li
      key={id}
      className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => body.length > 100 && setIsExpanded(!isExpanded)}
      aria-expanded={isExpanded}
      aria-controls={`comment-body-${id}`}
    >
      <div className="flex items-center mb-1 select-none cursor-default text-indigo-700">
        <User className="w-5 h-5 mr-2" />
        <h3 className="font-semibold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          {name.length > 20 ? name.slice(0, 20) + "…" : name}
        </h3>
      </div>

      <div className="flex items-center mb-3 select-none cursor-default text-xs text-gray-500">
        <Mail className="w-4 h-4 mr-1" />
        <p>{email}</p>
      </div>

      <p
        id={`comment-body-${id}`}
        className="text-gray-800 whitespace-pre-line mb-3"
        style={{ userSelect: "text" }}
      >
        {isExpanded ? body : truncate(body, 100)}
      </p>

      {body.length > 100 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center text-indigo-600 font-semibold text-sm hover:text-indigo-800 focus:outline-none"
          aria-expanded={isExpanded}
          aria-controls={`comment-body-${id}`}
        >
          {isExpanded ? "Read Less" : "Read More"}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </button>
      )}
    </li>
  );
};

export default Comment;
