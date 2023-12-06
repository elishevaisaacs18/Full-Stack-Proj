import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostWithComments } from "../../fetchHandl";
import Comment from "./Comment";
import useArrayExtendedState from "../../hooks/useArrayExtendedState";
import AddComment from "./AddComment";

// ...
function ViewPost() {
  const [comments, setComments, addComment, deleteComment, updateComment] =
    useArrayExtendedState();
  const [post, setPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);

  const params = useParams();

  async function getData() {
    let postWithComments = await getPostWithComments(params.id);
    setComments(postWithComments.comments);
    setPost(postWithComments);
  }

  useEffect(() => {
    getData();
  }, [params.id, showComments]);

  return (
    <div>
      {showAddComment && (
        <AddComment addCommentToArr={addComment} postId={post.id} />
      )}
      <div>
        {post ? (
          <div>
            <div className="post">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
            <button
              onClick={() => {
                setShowComments((prev) => !prev);
              }}
            >
              {showComments ? "hide comments" : "show comments"}
            </button>
            {showComments && (
              <button onClick={() => setShowAddComment(true)}>
                add comment
              </button>
            )}
            {showComments &&
              comments.map((com, key) => {
                return (
                  <div className="comment" key={key}>
                    <Comment
                      comment={com}
                      deleteCommentFromArr={deleteComment}
                    />
                  </div>
                );
              })}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
