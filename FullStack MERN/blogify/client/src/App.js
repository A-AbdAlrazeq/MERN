import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Register from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostsLists from "./components/Posts/PostsLists";
import UpdatePost from "./components/Posts/UpdatePost";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import UploadCoverImage from "./components/Users/UploadCoverImage";
import AccountVerification from "./components/Users/AccountVerification";
import PasswordResetRequest from "./components/Users/PasswordResetRequest";
import PasswordReset from "./components/Users/PasswordReset";
export default function App() {
  //! Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* Public user Profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        ></Route>
        {/* Private User Profile */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        ></Route>

        {/* Add Post */}
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        ></Route>
        {/* Post details */}
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        ></Route>
        {/* upload profile image */}
        <Route
          path="/upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        ></Route>
        {/* upload cover image */}
        <Route
          path="/upload-cover-image"
          element={
            <ProtectedRoute>
              <UploadCoverImage />
            </ProtectedRoute>
          }
        ></Route>
        {/* Verify account */}
        <Route
          path="/verify-account/:token"
          element={
            <ProtectedRoute>
              <AccountVerification />
            </ProtectedRoute>
          }
        ></Route>
        {/* forgot password request */}
        <Route
          path="/forgot-password"
          element={<PasswordResetRequest />}
        ></Route>
        {/* reset password  */}
        <Route
          path="/reset-password/:token"
          element={<PasswordReset />}
        ></Route>
        {/*update Post */}
        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route>
        {/* private post */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostsLists />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
