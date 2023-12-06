import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { handleFetch } from "../../fetchHandl";
import useArrayExtendedState from "../../hooks/useArrayExtendedState";

function Todos() {
  const { user } = useContext(UserContext);
  const emptyToDo = {
    userId: user.id,
    title: "",
    completed: false,
  };
  const [todos, setTodos, addTodo, deletTodo, uppTodo] =
    useArrayExtendedState();
  const [newTodo, setNewTodo] = useState({ ...emptyToDo });
  const [serch, setSerch] = useState("");
  useEffect(() => {
    try {
      handleFetch(`/todos?userId=${user.id}`, "GET", undefined).then((data) => {
        setTodos(data);
      });
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  }, []);
  const handleCheckboxChange = async (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);

    try {
      handleFetch(`/todos/${todoId}`, "PATCH", {
        completed: !todos.find((todo) => todo.id === todoId).completed,
      }).then((data) => {
        console.log("data: ", data);
      });
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  if (todos === null) {
    return <p>louding...</p>;
  }
  const addTask = async () => {
    setTodos((prev) => [...prev, newTodo]);

    try {
      handleFetch(`/todos`, "POST", newTodo).then((data) => {
        console.log("data: ", data);
      });
    } catch (error) {
      console.error("Error fetching album data:", error);
    }

    setNewTodo({ ...emptyToDo });
  };

  const hendelSerch = (serchUrl) => {
    try {
      handleFetch(`/todos?userId=${user.id}${serchUrl}`, "GET", undefined).then(
        (data) => {
          setTodos(data);
          setSerch("");
        }
      );
    } catch (error) {
      console.error("Error fetching album data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={serch}
        onChange={(e) => setSerch(e.target.value)}
      />
      <button onClick={() => hendelSerch(`&&title=${serch}`)}>serch</button>
      <button onClick={() => hendelSerch("")}>X</button>
      {todos.map((todo, key) => (
        <div key={key}>
          <input
            type="checkbox"
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id)}
          />
          <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
          <button
            onClick={() => {
              deletTodo(todo.id);
              handleFetch(`/todos/${todo.id}`, "DELETE");
            }}
          >
            x
          </button>
        </div>
      ))}
      <input
        type="text"
        value={newTodo.title}
        onChange={(event) => {
          setNewTodo((prev) => ({ ...prev, title: event.target.value }));
        }}
      />
      <button onClick={() => addTask(newTodo)}>add</button>
    </div>
  );
}

export default Todos;
