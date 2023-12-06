import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { handleFetch } from "../../fetchHandl";

function Register() {
  const { setCurrentUser } = useContext(UserContext);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    website: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key, event) => {
    setNewUser((prev) => {
      return { ...prev, [key]: event.target.value };
    });
  };

  const checkRegister = async () => {
    if (
      newUser.name === "" ||
      newUser.username === "" ||
      newUser.website === ""
    ) {
      setError("Please enter all the details");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(newUser.name)) {
      setError("The name should contain only letters");
      return;
    }
    const isExist = await handleFetch(
      `/users?username=${newUser.username}`,
      "GET"
    );
    console.log(isExist);
    if (isExist[0]) {
      console.log("found");
      setError("The username alredy exist");
      return;
    }

    try {
      handleFetch(`/users`, "POST", newUser).then((data) => {
        console.log("data: ", data);
        setCurrentUser(data);
      });
      navigate("/home");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <input
        value={newUser.name}
        type="text"
        placeholder="name"
        onChange={(event) => {
          handleChange("name", event);
        }}
      />
      <br />
      <input
        value={newUser.username}
        type="text"
        placeholder="username"
        onChange={(event) => {
          handleChange("username", event);
        }}
      />
      <br />
      <input
        value={newUser.website}
        type="text"
        placeholder="pasword"
        onChange={(event) => {
          handleChange("website", event);
        }}
      />
      <br />
      <button onClick={checkRegister}>Join</button>
      {error && <p>{error}</p>}
    </>
  );
}

export default Register;
