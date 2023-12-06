import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { handleFetch } from "../../fetchHandl";

function Photo() {
  const [photo, setPhoto] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    handleFetch(`/photos/${id}`, "GET").then((data) => {
      setPhoto(data);
    });
  }, []);
  if (photo === null) {
    return <p>loding...</p>;
  }
  return (
    <div>
      <img src={photo.url} alt="" />;<h3>{photo.title}</h3>
    </div>
  );
}
export default Photo;
