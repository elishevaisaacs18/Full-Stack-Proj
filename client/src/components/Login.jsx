import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ sendRequestToDb }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  async function tryConnection() {
    const data = await sendRequestToDb(
      "POST",
      `http://localhost:3000/user/login`,
      { user_name: username, password: password }
    );
    console.log("data: ", data);
    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await tryConnection();
    if (data.length > 0) {
      setIncorrect(false);
      localStorage.setItem("currentUser", data[0].id);
      navigate(`/home/${data[0].id}`);
    } else {
      setIncorrect(true);
    }
  }

  function handleInput(e, currState) {
    const currValue = e.target.value;
    if (currValue.length <= 15) {
      switch (currState) {
        case "username":
          setUsername(currValue);
          break;
        case "password":
          setPassword(currValue);
      }
    }
  }

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(e) => handleInput(e, "username")}
      />
      <br />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => handleInput(e, "password")}
      />
      <Link to="/register">Register!</Link>
      <button type="submit">Submit!</button>
      {incorrect && <h4>Incorrect!</h4>}
    </form>
  );
}

export default Login;
