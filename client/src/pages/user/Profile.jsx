import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { updateItemInfo } from "../../fetchHandl";
/*id: 0,
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    phone:"",
    website: "",
    company:{
      name: "",
      catchPhrase: "",
      bs: ""
    }
    */
function Profile() {
  const { user, setCurrentUser } = useContext(UserContext);
  const [changes, setChanges] = useState({ ...user });
  console.log("changes: ", changes);

  useEffect(() => {
    setChanges({ ...user });
  }, [user]);
  console.log("user: ", user);

  function handleChange(e, key) {
    setChanges((prev) => {
      return { ...prev, [key]: e.target.value };
    });
  }
  async function submitEditInfoForm() {
    setCurrentUser(changes);

    console.log("user: ", user);
    const response = await updateItemInfo("users", user.id, changes);
    console.log("Update response:", response);
    alert("changes added successfully");
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitEditInfoForm();
        }}
      >
        <h1>Profile</h1>
        <h4>Username: {changes.username}</h4>

        <label htmlFor="name">name: </label>
        <input
          onChange={(e) => handleChange(e, "name")}
          type="text"
          id="name"
          value={changes.name}
          name="name"
        />
        <br />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          onChange={(e) => handleChange(e, "website")}
          type="text"
          id="password"
          value={changes.website}
          name="password"
        />
        <br />
        <br />
        <label htmlFor="phone">phone: </label>
        <input
          onChange={(e) => handleChange(e, "phone")}
          type="text"
          id="phone"
          value={changes.website}
          name="phone"
        />
        <br />
        <br />
        <label htmlFor="email">email: </label>
        <input
          onChange={(e) => handleChange(e, "email")}
          type="text"
          id="email"
          value={changes.email}
          name="email"
        />

        <br />
        <br />
        <h4>Address: </h4>

        <label htmlFor="street">street: </label>
        <input
          onChange={(e) => handleChange(e, "street")}
          type="text"
          id="street"
          value={changes.street}
          name="street"
        />
        <br />
        <br />
        <label htmlFor="suite">suite: </label>
        <input
          onChange={(e) => handleChange(e, "suite")}
          type="text"
          id="suite"
          value={changes.suite}
          name="suite"
        />
        <br />
        <br />
        <label htmlFor="city">city: </label>
        <input
          onChange={(e) => handleChange(e, "city")}
          type="text"
          id="city"
          value={changes.city}
          name="city"
        />
        <br />
        <br />
        <label htmlFor="zipcode">zipcode: </label>
        <input
          onChange={(e) => handleChange(e, "zipcode")}
          type="text"
          id="zipcode"
          value={changes.zipcode}
          name="zipcode"
        />
        <br />
        <br />
        <input type="submit" value="add changes" />
      </form>
    </>
  );
}
export default Profile;
