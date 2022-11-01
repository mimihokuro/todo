import React, { useCallback, useState } from "react";

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [incompletedTodoList, setIncompletedTodoList] = useState([]);
  const [completedTodoList, setCompletedTodoList] = useState([]);

  const inputTodoText = useCallback((e) => {
    setTodoText(e.target.value);
  }, []);

  const addNewTodo = useCallback(() => {
    setIncompletedTodoList((prevTodoList) => {
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

  const handleTodoComplete = useCallback(
    (index) => {
      setIncompletedTodoList((prevTodoList) => {
        const takenOutTodoList = [...prevTodoList];
        takenOutTodoList.splice(index, 1);
        return takenOutTodoList;
      });
      setCompletedTodoList((prevTodoList) => {
        const takenOutTodo = incompletedTodoList[index];
        const addCompletedTodoList = [...prevTodoList, takenOutTodo];
        return addCompletedTodoList;
      });
    },
    [incompletedTodoList]
  );

  const handleTodoDelete = useCallback(
    (index) => {
      setCompletedTodoList((prevTodoList) => {
        const afterDeleteTodoList = [...prevTodoList];
        afterDeleteTodoList.splice(index, 1);
        return afterDeleteTodoList;
      });
      return completedTodoList;
    },
    [completedTodoList]
  );

  return (
    <div>
      <h1>TODO</h1>
      <div>
        <button onClick={addNewTodo}>追加ボタン</button>
        <input value={todoText} onChange={inputTodoText} />
        <ul>
          {incompletedTodoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleTodoComplete(index)}>完了</button>
              </li>
            );
          })}
        </ul>
        <ul>
          {completedTodoList.map((todo, index) => {
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
