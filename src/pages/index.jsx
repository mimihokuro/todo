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
      if (todoText === "") {
        alert("入力がありません。TODOを登録してください。");
        return prevTodoList;
      }
      const newTodoList = [...prevTodoList, todoText];
      return newTodoList;
    });
    setTodoText("");
  }, [todoText]);

  const handleTodoDelete = useCallback(
    (index) => {
      setTodoList((prevTodoList) => {
        const afterDeleteTodoList = [...prevTodoList];
        afterDeleteTodoList.splice(index, 1);
        return afterDeleteTodoList;
      });
      return todoList;
    },
    [todoList]
  );

  return (
    <div>
      <h1>TODO</h1>
      <div>
        <button onClick={addNewTodo}>追加ボタン</button>
        <input value={todoText} onChange={inputTodoText} />
        <ul>
          {todoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleTodoDelete(index)}>削除</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
