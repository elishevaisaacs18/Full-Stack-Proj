import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { handleFetch } from "../../fetchHandl";
import useArrayExtendedState from "../../hooks/useArrayExtendedState";

const Albums = () => {
  const [albums, setAlbums, addAlbum, deletAlbum, uppAlbum] =
    useArrayExtendedState();
  const [myPhotos, setMyPhotos, addMyPhotos, deleteMyPhotos, uppMyPhotos] =
    useArrayExtendedState();
  const [newPhoto, setNewPhoto] = useState({ title: "", url: "" });
  const { user } = useContext(UserContext);
  const [newAlbum, setNewAlbum] = useState({ userId: user.id, title: "" });
  const { id = 0 } = useParams();
  useEffect(() => {
    try {
      handleFetch(`/albums?userId=${user.id}`, "GET", undefined).then(
        (data) => {
          setAlbums(data);
        }
      );
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  }, []);

  useEffect(() => {
    try {
      handleFetch(`/photos?albumId=${id}`, "GET", undefined).then((data) => {
        console.log("data: ", data);

        setMyPhotos(data);
      });
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  }, [id]);

  if (!albums) {
    return <div>Loading...</div>;
  }
  console.log("albums: ", albums);
  const curentAlbum = albums.find((album) => album.id == id);
  return (
    <>
      <div>
        <h1>albums</h1>
        <input
          type="text"
          value={newAlbum.title}
          onChange={(e) =>
            setNewAlbum((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
        <button
          onClick={() => {
            handleFetch(`/albums`, "POST", newAlbum).then((data) =>
              addAlbum(data)
            );
          }}
        >
          add album
        </button>
        {curentAlbum?.title}
        <br />

        <div>
          <input
            type="text"
            placeholder="title photo"
            value={newPhoto.title}
            onChange={(e) =>
              setNewPhoto((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          <input
            type="text"
            placeholder="url photo"
            value={newPhoto.url}
            onChange={(e) =>
              setNewPhoto((prev) => {
                return { ...prev, url: e.target.value };
              })
            }
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {!myPhotos && <p>Louding...</p>}
          {myPhotos &&
            myPhotos.map((photo, index) => (
              <div key={index} style={{ maxWidth: "100px", margin: "10px" }}>
                <NavLink to={`/photo/${photo.id}`}>
                  <img
                    src={photo.url}
                    alt={`Photo ${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </NavLink>
              </div>
            ))}
        </div>

        <br />

        <nav style={{ display: "flex", justifyContent: "center" }}>
          {albums.map((album, key) => {
            const title = album.title;
            const words = title.split(" ");
            const firstTwoWords = words.slice(0, 2).join(" ");
            return (
              <div key={key} style={{ margin: "0 10px" }}>
                *<NavLink to={`${album.id}`}>{firstTwoWords}</NavLink>*
                <button
                  onClick={() => {
                    handleFetch(`/photos`, "POST", {
                      ...newPhoto,
                      albumId: album.id,
                    });
                    addMyPhotos(newPhoto);
                  }}
                >
                  add photo
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Albums;
