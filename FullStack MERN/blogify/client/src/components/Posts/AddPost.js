import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  createCategoryAction,
  fetchCategoriesAction,
  seedDefaultCategoriesAction,
} from "../../redux/slices/categories/categoriesSlice";
import { addPostAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
const AddPost = () => {
  //fetch categories
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //! Error state
  const [errors, setErrors] = useState({});
  //get data from store
  const { categories, loading: categoriesLoading, error: categoriesError } =
    useSelector((state) => state?.categories || {});

  const [seedAttempted, setSeedAttempted] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    if (seedAttempted) return;
    if (categoriesLoading) return;
    if (categoriesError) return;
    if (Array.isArray(categories) && categories.length === 0) {
      setSeedAttempted(true);
      dispatch(seedDefaultCategoriesAction()).then(() => {
        dispatch(fetchCategoriesAction());
      });
    }
  }, [categories, categoriesLoading, categoriesError, dispatch, seedAttempted]);
  const options = categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    };
  });
  //! Get post from store
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts
  );

  //! form data
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  //1. Validate form
  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "Title is required";
    if (!data.image) errors.image = "Image is required";
    if (!data.category) errors.category = "Category is required";
    if (!data.content) errors.content = "Content is required";
    return errors;
  };

  //2. HandleBlur
  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //! React select handle change
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  //! Handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;
    dispatch(createCategoryAction({ name })).then(() => {
      setNewCategoryName("");
      dispatch(fetchCategoriesAction());
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch action
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(addPostAction(formData)).then((result) => {
        if (result?.meta?.requestStatus === "fulfilled") {
          const createdId =
            result?.payload?.post?._id ||
            result?.payload?.post?.id ||
            result?.payload?._id;
          if (createdId) {
            navigate(`/posts/${createdId}`);
          } else {
            navigate("/posts");
          }
        }
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col items-center p-8 md:p-10 bg-white rounded-2xl shadow-xl border border-coolGray-100">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Add New Post
          </h2>
          {/* error */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post created successfully" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {/* error here */}
            {errors?.title && <p className="text-red-500 ">{errors.title}</p>}
          </label>
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
          {/* category here */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
              onBlur={handleBlur}
              isDisabled={categoriesLoading || !categories?.length}
              placeholder={
                categoriesLoading
                  ? "Loading categories..."
                  : !categories?.length
                    ? "No categories available"
                    : "Select a category"
              }
            />
            {categoriesError?.message && (
              <p className="text-red-500 ">{categoriesError?.message}</p>
            )}
            {!categoriesLoading && !categoriesError && !categories?.length && (
              <p className="text-yellow-700">
                No categories found. Create a category first, then come back to
                add a post.
              </p>
            )}
            {/* error here */}
            {/* error here */}
            {errors?.category && (
              <p className="text-red-500 ">{errors.category}</p>
            )}
          </label>

          <div className="mb-6 w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className="py-3 px-3 leading-5 w-full text-coolGray-700 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
                type="text"
                placeholder="Add new category (e.g. Finance)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={!newCategoryName.trim()}
                className="inline-flex items-center justify-center py-3 px-5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Add Category
              </button>
            </div>
          </div>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.content && (
              <p className="text-red-500 ">{errors.content}</p>
            )}
          </label>
          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              disabled={categoriesLoading || !categories?.length}
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
