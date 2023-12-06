import { useState } from "react";
import { deleteItemByItsId } from "../../fetchHandl";

function Comment({ comment, deleteCommentFromArr }) {
  console.log("comment: ", comment);
  async function deleteCommentByItsId(id) {
    let res = await deleteItemByItsId("comments", id);
    alert(res);
  }
  return (
    <div className="comments">
      <h2>{comment.name}</h2>
      <h3>{comment.email}</h3>
      <p>{comment.body}</p>
      <button
        onClick={() => {
          //   console.log("comment: ", comment);
          console.log("comment.id: ", comment.id);
          deleteCommentByItsId(comment.id);
          deleteCommentFromArr(comment.id);
        }}
      >
        delete
      </button>
    </div>
  );
}
export default Comment;
