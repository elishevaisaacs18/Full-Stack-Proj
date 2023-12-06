import { useNavigate } from "react-router-dom";
import { deleteItemByItsId } from "../../fetchHandl";

function Post({ post, deleteFromArray }) {
  let navigate = useNavigate();
  function enterSinglePostPage(postId) {
    navigate(`./${postId}`);
  }
  async function deletePostByPostId(id) {
    let res = await deleteItemByItsId("posts", id);
    alert(res);
    deleteFromArray(id);
  }

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button
        onClick={() => {
          enterSinglePostPage(post.id);
        }}
      >
        view post
      </button>
      <button
        onClick={() => {
          deletePostByPostId(post.id);
        }}
      >
        delete
      </button>
    </div>
  );
}
export default Post;
