import { useContext, useEffect, useState } from "react";
import { getItemArray } from "../../fetchHandl";
import { UserContext } from "../../context/UserContext";
import Post from "./Post";
import useArrayExtendedState from "../../hooks/useArrayExtendedState";
import AddPost from "./AddPost";
function Posts() {
  const [showAddPost, setShowAddPost] = useState(false);
  const { user } = useContext(UserContext);
  const [
    postsArray,
    setPostsArray,
    addPostToArray, //addItemToArr(item)
    deleteFromPostsArray, //deleteFromStateArray(itemId)
    updatePostInArray, //updateItem(id, newItem)
  ] = useArrayExtendedState();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const POSTS = await getItemArray("posts", user.id);
      setPostsArray(POSTS);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  return (
    <div>
      {showAddPost && (
        <AddPost
          setShowAddPost={setShowAddPost}
          addPostToArr={addPostToArray}
        />
      )}

      <div>
        <h1>my posts</h1>

        <button onClick={() => setShowAddPost(true)}>add post</button>

        {postsArray ? (
          postsArray.map((post, key) => {
            console.log("post: ", post);
            return (
              <Post
                key={key}
                post={post}
                deleteFromArray={deleteFromPostsArray}
              />
            );
          })
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}
export default Posts;
