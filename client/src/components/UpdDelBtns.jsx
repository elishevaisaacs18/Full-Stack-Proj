import useFetch from "../assets/customHooks/useFetch";

const UpdDelBtns = ({
  contentId,
  contentUrl,
  setContent,
  getPostData,
  sendRequestToDb,
  setChangedContent,
  changedContent
}) => {
  const fetchData = useFetch;

  async function deleteContent() {
    await fetchData(contentUrl, {
      method: "DELETE",
    });
    setContent((prev) => {
      return prev.filter((content) => content.id !== contentId);
    });
    setChangedContent(!changedContent)
  }

  async function changeContent() {
    const newContentObj = getPostData();
    try {
      const response = await sendRequestToDb("PATCH", contentUrl, newContentObj);
      setContent((prev) => {
        return prev.map((post) =>
          post.id === response.id ? { ...post, ...response } : post
        );
      });
      setChangedContent(!changedContent)
    } catch (error) {
      console.error("Error updating content:", error);
    }
  }

  return (
    <div>
      <button
        onClick={async () => {
          await changeContent();
        }}
      >
        update
      </button>
      <button
        onClick={async () => {
          await deleteContent();
        }}
      >
        delete
      </button>
    </div>
  );
};

export default UpdDelBtns;
