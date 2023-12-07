import { useState, useEffect } from "react";
import useFetch from "../assets/customHooks/useFetch";
import { useParams } from "react-router-dom";

const Info = () => {
  const [info, setInfo] = useState([]);
  const fetchData = useFetch;
  const { id } = useParams();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await fetchData(`http://localhost:3000/user/${id}`);
        setInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfo();
  }, []);

  const infoDisplay = info.map((user) => {
    return (
      <div key={user.id}>
        <h4>id: {user.id}</h4>
        <h4>full_name: {user.full_name}</h4>
        <h4>user_name: {user.user_name}</h4>
      </div>
    );
  });
  return (
    <section>
      <h2>Your info</h2>
      <div>
        {info.length > 0 ? (
          <section>{infoDisplay}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
};

export default Info;
