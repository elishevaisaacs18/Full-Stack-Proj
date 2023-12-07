import useFetch from "../assets/customHooks/useFetch";

const UpdDelBtns = ({
  contentId,
  contentUrl,
  setContent,
  getPostData,
  sendRequestToDb,
}) => {
  const fetchData = useFetch;

  async function deleteContent() {
    await fetchData(contentUrl, {
      method: "DELETE",
    });
    setContent((prev) => {
      return prev.filter((content) => content.id !== contentId);
    });
  }

  async function changeContent() {
    const newContentObj = getPostData();
    try {
      const response = await sendRequestToDb("PUT", contentUrl, newContentObj);
      setContent((prev) => {
        return prev.map((post) =>
          post.id === response.id ? { ...post, ...response } : post
        );
      });
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
