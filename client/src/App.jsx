import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Info from "./components/Info";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import useFetch from "./assets/customHooks/useFetch";

const App = () => {
  const [showPost, setShowPost] = useState(false);
  const fetchData = useFetch;
  async function sendRequestToDb(requestType, url, body) {
    const response = await fetchData(url, {
      method: requestType,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login"></Navigate>} />
        <Route
          path="/login"
          element={<Login sendRequestToDb={sendRequestToDb} />}
        />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout setShowPost={setShowPost} />}>
          <Route path="/home/:id" element={<Home />}>
            <Route path="info/" element={<Info />} />
            <Route
              path="posts/"
              element={<Posts showPost={showPost} setShowPost={setShowPost} sendRequestToDb={sendRequestToDb} />}
            />
            <Route
              path="posts/:postId"
              element={<Posts showPost={showPost} setShowPost={setShowPost} />}
            >
              <Route path="comments" element={<Comments sendRequestToDb={sendRequestToDb} />} />
            </Route>
            <Route path="todos/" element={<Todos sendRequestToDb={sendRequestToDb}/>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
