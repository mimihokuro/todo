import React, { useCallback, useState } from "react";

const TODOS = [];
const COMPLETE_TODOS = [];

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [incompletedTodoList, setIncompletedTodoList] = useState(TODOS);
  const [completedTodoList, setCompletedTodoList] = useState(COMPLETE_TODOS);

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
      setIncompletedTodoList((prevTodoList) =>
        takeOutTodoInTodoList(prevTodoList, index)
      );
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
      setCompletedTodoList((prevTodoList) =>
        takeOutTodoInTodoList(prevTodoList, index)
      );
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
      setIncompletedTodoList((prevTodoList) =>
        takeOutTodoInTodoList(prevTodoList, index)
      );
      return incompletedTodoList;
    },
    [incompletedTodoList]
  );

  const handleTodoDelete = useCallback(
    (index) => {
      setCompletedTodoList((prevTodoList) =>
        takeOutTodoInTodoList(prevTodoList, index)
      );
      return completedTodoList;
    },
    [completedTodoList]
  );

  const takeOutTodoInTodoList = (prevTodoList, index) => {
    const takenOutTodoList = [...prevTodoList];
    takenOutTodoList.splice(index, 1);
    return takenOutTodoList;
  };

  return (
    <div>
      <h1>TODO</h1>
      <div>
        <button onClick={addNewTodo}>Add TODO</button>
        <input value={todoText} onChange={inputTodoText} />
        <h2>未完了</h2>
        <ul>
          {incompletedTodoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleTodoComplete(index)}>完了</button>
                <button onClick={() => handleTodoCancel(index)}>×</button>
              </li>
            );
          })}
        </ul>
        <h2>完了</h2>
        <ul>
          {completedTodoList.map((todo, index) => {
            return (
              <li key={index}>
                <label>
                  {todo}
                  <button onClick={() => handleTodoIncomplete(index)}>
                    未完了にする
                  </button>
                </label>
                <button onClick={() => handleTodoDelete(index)}>×</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
