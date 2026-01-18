import React, { useState } from "react";
import LoadingComponent from "../Alert/LoadingComponent";

const CommentsList = ({ comments, loading }) => {
  if (loading) {
    // If loading is true, render a loading component
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col space-y-4">
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex space-x-4">
            <div className="flex-none">
              <img
                src={
                  comment?.author?.profilePicture ||
                  "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                }
                alt="avatar"
                className="rounded-full h-12 w-12 object-cover"
              />
            </div>
            <div className="flex-grow">
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
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsList;
