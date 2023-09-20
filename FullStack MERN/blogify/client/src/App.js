import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  const HomePage = () => {
    return <h1>Welcome to Blogify</h1>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
