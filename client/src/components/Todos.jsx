import { useState, useEffect } from "react";
import useFetch from "../assets/customHooks/useFetch";
import { useParams } from "react-router-dom";
import FilterNav from "./FilterNav";
import UpdDelBtns from "./UpdDelBtns";

const Todos = ({ sendRequestToDb }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [serchParams, setSearchParams] = useState("");
  const [changedTodo, setChangedTodo] = useState(false);
  const fetchData = useFetch;
  const { id } = useParams();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchData(
          `http://localhost:3000/todo?user_id=${id}${serchParams}`
        );
        if (!(data.length > 0)) throw new Error("not found");
        setTodos(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [fetchData, id, serchParams, changedTodo]);

  async function addToDo() {
    const newToDoObj = getAddToDoContent();
    const responseToDo = await sendRequestToDb(
      "POST",
      `http://localhost:3000/todo`,
      newToDoObj
    );

    setTodos((prevToDos) => [...prevToDos, responseToDo]);
    setChangedTodo(!changedTodo);
  }

  function getAddToDoContent() {
    const ToDoTitle = prompt("please enter your todo title");
    const newToDo = {
      title: ToDoTitle,
      user_id: id,
      completed: 0,
    };
    return newToDo;
  }

  function updateTodosDb(e, id) {
    const currValue = e.target.checked;
    sendRequestToDb("PATCH", `http://localhost:3000/todo/${id}`, {
      completed: currValue,
    });
  }

  async function sortById() {
    const data = await fetchData(
      `http://localhost:3000/todo?user_id=${id}&_sort=id`
    );
    setTodos(data);
  }

  async function sortByCompleted() {
    const data = await fetchData(
      `http://localhost:3000/todo?user_id=${id}&_sort=completed`
    );
    setTodos(data);
  }

  async function sortByAlpha() {
    const data = await fetchData(
      `http://localhost:3000/todo?user_id=${id}&_sort=title`
    );
    setTodos(data);
  }

  async function sortByRandom() {
    const data = await fetchData(
      `http://localhost:3000/todo?user_id=${id}&_sort=random`
    );
    setTodos(data);
  }

  const todosDisplay = todos.map((todo) => (
    <div key={todo.id}>
      <UpdDelBtns
        contentId={todo.id}
        contentUrl={`http://localhost:3000/todo/${todo.id}`}
        setContent={setTodos}
        changedContent={changedTodo}
        setChangedContent={setChangedTodo}
        getPostData={getAddToDoContent}
        sendRequestToDb={sendRequestToDb}
      />
      <br />
      <input
        type="checkbox"
        defaultChecked={todo.completed}
        onChange={(e) => updateTodosDb(e, todo.id)}
      />
      <h4>id: {todo.id}</h4>
      <h4>title: {todo.title}</h4>
    </div>
  ));
  return (
    <section>
      <h2>Your todos</h2>

      <button onClick={addToDo}>add todo</button>

      <div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <FilterNav setSearchParams={setSearchParams} todos={true} />
            <nav id="todosSortNav">
              <h3>Sort by: </h3>
              <button type="button" className="todosSortBtn" onClick={sortById}>
                id
              </button>
              <button
                type="button"
                className="todosSortBtn"
                onClick={sortByCompleted}
              >
                completed
              </button>
              <button
                type="button"
                className="todosSortBtn"
                onClick={sortByAlpha}
              >
                title
              </button>
              <button
                type="button"
                className="todosSortBtn"
                onClick={sortByRandom}
              >
                random
              </button>
            </nav>
            {error ? (
              <h2>Error! not found</h2>
            ) : (
              <>
                <h3>Todos: </h3>
                <section>{todosDisplay}</section>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Todos;
