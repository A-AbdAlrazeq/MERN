import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Register from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
