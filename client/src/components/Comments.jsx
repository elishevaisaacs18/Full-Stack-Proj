import { useState, useEffect } from "react";
import useFetch from "../assets/customHooks/useFetch";
import { useParams } from "react-router-dom";
import UpdDelBtns from "./UpdDelBtns";

const Comments = ({ sendRequestToDb }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [changedComment, setChangedComment] = useState(false);
  const fetchData = useFetch;
  const { id, postId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchData(
          `http://localhost:3000/comment?post_id=${postId}`
        );
        if (!(data.length > 0)) throw new Error("not found");
        setComments(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [fetchData, postId, changedComment]);

  async function addComment() {
    const newCommentsObj = getAddCommentsContent();
    const responseComments = await sendRequestToDb(
      "POST",
      `http://localhost:3000/comment/`,
      newCommentsObj
    );

    setComments((prevComments) => [...prevComments, responseComments]);
    setChangedComment(!changedComment);
  }

  function getAddCommentsContent() {
    const commentName = prompt("please enter your comment name");
    const commentBody = prompt("please enter your comment body");
    const newComment = {
      title: commentName,
      body: commentBody,
      post_id: postId,
      user_id: id,
    };
    return newComment;
  }

  const commentsDisplay = comments.map((comment) => {
    return (
      <div key={comment?.id}>
        <UpdDelBtns
          contentId={comment.id}
          contentUrl={`http://localhost:3000/comment/${comment.id}`}
          setContent={setComments}
          changedContent={changedComment}
          setChangedContent={setChangedComment}
          getPostData={getAddCommentsContent}
          sendRequestToDb={sendRequestToDb}
        />
        <h4>body: {comment?.body}</h4>
        <h4>id: {comment?.id}</h4>
        <h4>title: {comment?.title}</h4>
        <h4>postId: {comment?.post_id}</h4>
      </div>
    );
  });

  return (
    <>
      <h2>Your comments</h2>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error! not found</h2>
      ) : (
        <section>
          <button onClick={addComment}>add comment</button>
          <div>
            <section>{commentsDisplay}</section>
          </div>
        </section>
      )}
    </>
  );
};

export default Comments;
