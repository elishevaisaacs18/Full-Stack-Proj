export async function handleFetch(url, method, body) {
  try {
    const response = await fetch(`http://localhost:3000${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : JSON.stringify(body),
    });
    const data = await response.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    return { error: "Error fetching data:", details: error };
  }
}
