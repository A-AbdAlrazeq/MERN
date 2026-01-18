import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPostsAction } from "../../redux/slices/posts/postsSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// truncatePost from "../../utils/truncatePost";
//import Warning from "../Alert/Warning";

const PublicPosts = () => {
  //! redux store
  const dispatch = useDispatch();
  const { posts, error, loading, success } = useSelector(
    (state) => state?.posts
  );

  const dummyPosts = [
    {
      _id: "dummy-1",
      title: "Welcome to Blogify: Your first story starts here",
      createdAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=60",
      category: { name: "Lifestyle" },
    },
    {
      _id: "dummy-2",
      title: "5 habits to level up your productivity",
      createdAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=60",
      category: { name: "Business" },
    },
    {
      _id: "dummy-3",
      title: "The future of social media: what’s next?",
      createdAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=60",
      category: { name: "Social Media" },
    },
    {
      _id: "dummy-4",
      title: "Beginner’s guide: getting started with fitness",
      createdAt: new Date().toISOString(),
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=60",
      category: { name: "Health" },
    },
  ];

  //const { userAuth } = useSelector((state) => state?.users);

  //dispatch
  useEffect(() => {
    dispatch(fetchPublicPostsAction());
  }, [dispatch]);

  return (
    <>
      <div>
        <section className="relative py-20 bg-white">
          <div className="absolute top-0 left-0 w-full h-full" />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Blog
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
              {/* loop */}
              {loading ? (
                <div className="flex justify-center items-center h-full w-full md:col-span-2">
                  <LoadingComponent />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center md:col-span-2">
                  {error?.message}
                </h3>
              ) : (
                (posts?.posts?.length ? posts?.posts : dummyPosts).map((post) => {
                  const isDummy = String(post?._id || "").startsWith("dummy-");
                  const Card = ({ children }) =>
                    isDummy ? (
                      <button
                        type="button"
                        onClick={() =>
                          Swal.fire({
                            icon: "info",
                            title: "Demo content",
                            text: "These are placeholder posts. Create a real post to view details.",
                          })
                        }
                        className="group block overflow-hidden rounded-xl border border-coolGray-100 bg-white shadow-sm hover:shadow-md transition text-left"
                      >
                        {children}
                      </button>
                    ) : (
                      <Link
                        to={`/posts/${post?._id}`}
                        className="group block overflow-hidden rounded-xl border border-coolGray-100 bg-white shadow-sm hover:shadow-md transition"
                      >
                        {children}
                      </Link>
                    );

                  return (
                    <Card key={post?._id}>
                      <div className="aspect-[16/9] overflow-hidden bg-coolGray-100">
                        <img
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                          src={post?.image}
                          alt={post?.title}
                        />
                      </div>

                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="inline-block py-1 px-3 text-xs leading-5 text-green-600 font-semibold uppercase bg-green-50 rounded-full">
                            {post?.category?.name}
                          </span>
                          <span className="text-xs text-coolGray-500 font-medium">
                            {new Date(post?.createdAt).toDateString()}
                          </span>
                        </div>

                        <div className="mb-3 text-xl md:text-2xl leading-tight text-coolGray-900 font-bold group-hover:underline">
                          {post?.title}
                        </div>
                        <div className="inline-flex items-center text-base text-green-600 font-semibold">
                          <span className="mr-3">Read Post</span>
                          <svg
                            width={8}
                            height={10}
                            viewBox="0 0 8 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.94667 4.74665C7.91494 4.66481 7.86736 4.59005 7.80666 4.52665L4.47333 1.19331C4.41117 1.13116 4.33738 1.08185 4.25617 1.04821C4.17495 1.01457 4.08791 0.997253 4 0.997253C3.82246 0.997253 3.6522 1.06778 3.52667 1.19331C3.46451 1.25547 3.4152 1.32927 3.38156 1.41048C3.34792 1.4917 3.33061 1.57874 3.33061 1.66665C3.33061 1.84418 3.40113 2.01445 3.52667 2.13998L5.72667 4.33331H0.666667C0.489856 4.33331 0.320286 4.40355 0.195262 4.52858C0.070238 4.6536 0 4.82317 0 4.99998C0 5.17679 0.070238 5.34636 0.195262 5.47138C0.320286 5.59641 0.489856 5.66665 0.666667 5.66665H5.72667L3.52667 7.85998C3.46418 7.92196 3.41458 7.99569 3.38074 8.07693C3.34689 8.15817 3.32947 8.24531 3.32947 8.33331C3.32947 8.42132 3.34689 8.50846 3.38074 8.5897C3.41458 8.67094 3.46418 8.74467 3.52667 8.80665C3.58864 8.86913 3.66238 8.91873 3.74361 8.95257C3.82485 8.98642 3.91199 9.00385 4 9.00385C4.08801 9.00385 4.17514 8.98642 4.25638 8.95257C4.33762 8.91873 4.41136 8.86913 4.47333 8.80665L7.80666 5.47331C7.86736 5.40991 7.91494 5.33515 7.94667 5.25331C8.01334 5.09101 8.01334 4.90895 7.94667 4.74665Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
            {/*   {!userAuth?.userInfo && <Warning />} */}
          </div>
        </section>
      </div>
    </>
  );
};

export default PublicPosts;
