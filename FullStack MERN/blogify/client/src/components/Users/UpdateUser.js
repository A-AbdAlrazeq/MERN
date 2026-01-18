import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { updateUserProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userAuth, isUpdated } = useSelector(
    (state) => state?.users
  );
  console.log(error);
  const [formData, setFormData] = useState({
    email: userAuth?.userInfo?.email,
    username: userAuth?.userInfo?.username,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there is an error
    if (!error) {
      dispatch(
        updateUserProfileAction({
          username: formData.username,
          email: formData.email,
        })
      )
        .then((result) => {
          if (result?.meta?.requestStatus === "fulfilled") {
            setTimeout(() => navigate("/user-profile"), 600);
          }
          // If the update was successful, update localStorage
          const updatedUserInfo = {
            ...JSON.parse(localStorage.getItem("userInfo")),
            username: formData.username,
            email: formData.email,
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        })
        .catch((error) => {
          // Handle the update error
          console.error("Error updating profile:", error.message);
          // Optionally, you can reset the form data to the previous values here
          setFormData({
            email: userAuth?.userInfo?.email,
            username: userAuth?.userInfo?.username,
          });
        });
    }
  };

  useEffect(() => {
    if (isUpdated) return;
  }, [isUpdated]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-10 bg-gradient-to-br from-green-50 via-white to-emerald-50"
    >
      <div className="w-full max-w-xl p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-coolGray-100">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Update your Profile
        </h1>
        {error && <ErrorMsg message={error?.message} />}
        {isUpdated && <SuccessMsg message="Profile updated successfully" />}
        <div className="mb-4 relative">
          <AiOutlineUser className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Update your username"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Update your email"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        {loading ? (
          <LoadingComponent />
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Update Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateUser;
