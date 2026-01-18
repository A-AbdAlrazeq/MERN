import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import { uploadCoverImageAction } from "../../redux/slices/users/usersSlices";

const UploadCoverImage = () => {
  //fetch categories
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //! Error state
  const [errors, setErrors] = useState({});

  useEffect(() => {}, [dispatch]);
  //! form data
  const [formData, setFormData] = useState({
    image: null,
  });
  const { isCoverImageUploaded, loading, error } = useSelector(
    (state) => state?.users
  );
  //1. Validate form
  const validateForm = (data) => {
    let errors = {};

    if (!data.image) errors.image = "Image is required";

    return errors;
  };

  //2. HandleBlur
  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  //! Handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch action
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(uploadCoverImageAction(formData)).then((result) => {
        if (result?.meta?.requestStatus === "fulfilled") {
          setTimeout(() => navigate("/user-profile"), 600);
        }
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col items-center p-8 md:p-10 bg-white rounded-2xl shadow-xl border border-coolGray-100">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Upload Cover Image
          </h2>
          {/* error */}
          {error && <ErrorMsg message={error?.message} />}
          {isCoverImageUploaded && (
            <SuccessMsg message="Image uploaded successfully" />
          )}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Upload or update Cover Image
          </h3>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.image && <p className="text-red-500 ">{errors.image}</p>}
          </label>

          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Upload Image
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadCoverImage;
