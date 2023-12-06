import { NavLink, Outlet } from "react-router-dom";
import { DEFAULT_USER, UserContext } from "../context/UserContext";
import { useContext } from "react";

function Header() {
  const { user, setCurrentUser } = useContext(UserContext);

  function logOut() {
    localStorage.setItem("user", JSON.stringify(DEFAULT_USER));
    setCurrentUser(DEFAULT_USER);
  }
  return (
    <>
      <nav>
        <NavLink to="/profile">profile</NavLink>- - -
        <NavLink to="/posts">posts</NavLink>- - -
        {/* <NavLink to="/albums">albums</NavLink>- - - */}
        <NavLink to="/todos">todos</NavLink>- - -
        <NavLink to="/home">home</NavLink>- - -
        <NavLink
          to="/"
          onClick={() => {
            logOut();
          }}
        >
          log out
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Header;
