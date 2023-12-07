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
        console.log(
          " `http://localhost:3000/todo?user_id=${id}${serchParams}`: ",
          `http://localhost:3000/todo?user_id=${id}${serchParams}`
        );

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

  // function sortById() {
  //   setTodos((prev) => {
  //     return [...prev].sort((a, b) => {
  //       if (a.id < b.id) {
  //         return -1;
  //       } else if (a.id > b.id) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });
  // }

  // function sortByCompleted() {
  //   setTodos((prev) => {
  //     return [...prev].sort((a, b) => {
  //       if (a.completed && !b.completed) {
  //         return -1;
  //       } else if (!a.completed && b.completed) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });
  // }

  // function sortByAlpha() {
  //   setTodos((prev) => {
  //     return [...prev].sort((a, b) => {
  //       if (
  //         alphabet.indexOf(a.title[0].toLowerCase()) <
  //         alphabet.indexOf(b.title[0].toLowerCase())
  //       ) {
  //         return -1;
  //       } else if (
  //         alphabet.indexOf(a.title[0].toLowerCase()) >
  //         alphabet.indexOf(b.title[0].toLowerCase())
  //       ) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });
  // }

  // function sortByRandom() {
  //   const randomArr = todos.map(() => Math.floor(Math.random() * todos.length));
  //   setTodos((prev) => {
  //     return [...prev].sort((a, b) => {
  //       if (randomArr[prev.indexOf(a)] < randomArr[prev.indexOf(b)]) {
  //         return -1;
  //       } else if (randomArr[prev.indexOf(a)] > randomArr[prev.indexOf(b)]) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });
  // }

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
