import React, { useState } from "react";
import LoadingComponent from "../Alert/LoadingComponent";

const CommentsList = ({ comments, loading }) => {
  if (loading) {
    // If loading is true, render a loading component
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-none">
          <img
            src="https://via.placeholder.com/50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex-grow">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id}>
                <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-blue-600">
                      {comment?.author?.username || "Unknown User"}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {comment?.createdAt
                        ? new Date(comment?.createdAt).toDateString()
                        : "Unknown Date"}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 px-4 py-3 sm:px-6">
                  <p className="mt-1 text-sm text-gray-700">
                    {comment?.message || "Invalid Comment"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
