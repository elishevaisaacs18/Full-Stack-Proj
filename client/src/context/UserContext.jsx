import { createContext, useState, useEffect } from "react";

export const DEFAULT_USER = {
  id: 0,
  full_name: "",
  username: "",
};

const UserContext = createContext({
  user: DEFAULT_USER,
  setCurrentUser: () => {},
});

function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    // Fetch user from localStorage during the initial render
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser((prev) => {
          return { ...prev, ...parsedUser };
        });
      } catch (error) {
        console.error("Error parsing user from local storage:", error);
      }
    }
  }, []); // Run the effect only once during the initial render

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function setCurrentUser(newUser) {
    try {
      setUser((prev) => {
        return { ...prev, ...newUser };
      });
    } catch (error) {
      console.error("Error setting user in local storage:", error);
      // Handle the error accordingly, e.g., show a user-friendly message to the user.
    }
  }

  return (
    <UserContext.Provider value={{ user, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
