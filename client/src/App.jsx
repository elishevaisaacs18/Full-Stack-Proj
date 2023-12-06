import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// import ressetDB from "./resetDB";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/user/login";
import Register from "./pages/user/Register";
import Home from "./components/Home";
import Profile from "./pages/user/Profile";
import Header from "./components/Header";
import Albums from "./pages/albums/Albums";
import Photo from "./pages/albums/Photo";
import Posts from "./pages/posts/Posts";
import ViewPost from "./pages/posts/ViewPost";
import Todos from "./pages/todos/Todos";

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/*" element={<Header />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="posts">
              <Route index element={<Posts />} />
              <Route path=":id" element={<ViewPost />} />
            </Route>
            {/* <Route path="albums" element={<Albums />}>
              <Route index element={<></>} />
              <Route path=":id" element={<></>}></Route>
            </Route> */}
            <Route path="photo/:id" element={<Photo />} />
            <Route path="todos" element={<Todos />} />
          </Route>
          <Route path="/:page" element={<h1>page not found...</h1>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
