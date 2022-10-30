import React, { useCallback, useState } from "react";

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputTodoText = useCallback((e) => {
    setTodoText(e.target.value);
  }, []);

  const addNewTodo = useCallback(() => {
    setTodoList((prevTodoList) => {
      if (prevTodoList.some((item) => item === todoText)) {
        alert("すでに登録されています。別のTODOを登録してください。");
        return prevTodoList;
      }
      const newTodoList = [...prevTodoList, todoText];
      return newTodoList;
    });
    setTodoText("");
  }, [todoText]);

  return (
    <div>
      <h1>TODO</h1>
      <div>
        <button onClick={addNewTodo}>追加ボタン</button>
        <input value={todoText} onChange={inputTodoText} />
        <ul>
          {todoList.map((todo) => {
            return <li key={todo}>{todo}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
