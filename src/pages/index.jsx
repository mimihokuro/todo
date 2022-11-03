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

  const handleTodoIncomplete = useCallback(
    (index) => {
      setCompletedTodoList((prevTodoList) => {
        const takenOutTodoList = [...prevTodoList];
        takenOutTodoList.splice(index, 1);
        return takenOutTodoList;
      });
      setIncompletedTodoList((prevTodoList) => {
        const takenOutTodo = completedTodoList[index];
        const addCompletedTodoList = [...prevTodoList, takenOutTodo];
        return addCompletedTodoList;
      });
    },
    [completedTodoList]
  );

  const handleTodoCancel = useCallback(
    (index) => {
      setIncompletedTodoList((prevTodoList) => {
        const afterDeleteTodoList = [...prevTodoList];
        afterDeleteTodoList.splice(index, 1);
        return afterDeleteTodoList;
      });
      return incompletedTodoList;
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
        <h2>未完了</h2>
        <ul>
          {incompletedTodoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleTodoComplete(index)}>完了</button>
                <button onClick={() => handleTodoCancel(index)}>削除</button>
              </li>
            );
          })}
        </ul>
        <h2>完了</h2>
        <ul>
          {completedTodoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleTodoIncomplete(index)}>
                  未完了に戻す
                </button>
                <button onClick={() => handleTodoDelete(index)}>削除</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
