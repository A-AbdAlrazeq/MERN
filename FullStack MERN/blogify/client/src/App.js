import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/Homepage";
//import Login from "./components/Users/Login";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
