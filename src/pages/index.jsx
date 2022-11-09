import React, { useCallback, useState } from "react";

const TODOS = [];
const COMPLETE_TODOS = [];

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodoList, setIncompleteTodoList] = useState(TODOS);
  const [completeTodoList, setCompleteTodoList] = useState(COMPLETE_TODOS);

  const handleInputTodoText = useCallback((e) => {
    setTodoText(e.target.value);
  }, []);

  const handleAddNewTodo = useCallback(() => {
    setIncompleteTodoList((prevTodoList) => {
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

  const handleCompleteTodo = useCallback(
    (index) => {
      setIncompleteTodoList((prevTodoList) =>
        handleTakeOutTodo(prevTodoList, index)
      );
      setCompleteTodoList((prevTodoList) => {
        const takenOutTodo = incompleteTodoList[index];
        const newCompleteTodoList = [...prevTodoList, takenOutTodo];
        return newCompleteTodoList;
      });
    },
    [incompleteTodoList]
  );

  const handleIncompleteTodo = useCallback(
    (index) => {
      setCompleteTodoList((prevTodoList) =>
        handleTakeOutTodo(prevTodoList, index)
      );
      setIncompleteTodoList((prevTodoList) => {
        const takenOutTodo = completeTodoList[index];
        const returnedIncompleteTodoList = [...prevTodoList, takenOutTodo];
        return returnedIncompleteTodoList;
      });
    },
    [completeTodoList]
  );

  const handleCancelTodo = useCallback(
    (index) => {
      setIncompleteTodoList((prevTodoList) =>
        handleTakeOutTodo(prevTodoList, index)
      );
      return incompleteTodoList;
    },
    [incompleteTodoList]
  );

  const handleDeleteTodo = useCallback(
    (index) => {
      setCompleteTodoList((prevTodoList) =>
        handleTakeOutTodo(prevTodoList, index)
      );
      return completeTodoList;
    },
    [completeTodoList]
  );

  const handleTakeOutTodo = (prevTodoList, index) => {
    const takenOutTodoList = [...prevTodoList];
    takenOutTodoList.splice(index, 1);
    return takenOutTodoList;
  };

  return (
    <div>
      <h1 className="text-3xl">TODO</h1>
      <div>
        <button onClick={handleAddNewTodo}>Add TODO</button>
        <input value={todoText} onChange={handleInputTodoText} />
        <h2>未完了</h2>
        <ul>
          {incompleteTodoList.map((todo, index) => {
            return (
              <li key={index}>
                {todo}
                <button onClick={() => handleCompleteTodo(index)}>完了</button>
                <button onClick={() => handleCancelTodo(index)}>×</button>
              </li>
            );
          })}
        </ul>
        <h2>完了</h2>
        <ul>
          {completeTodoList.map((todo, index) => {
            return (
              <li key={index}>
                <label>
                  {todo}
                  <button onClick={() => handleIncompleteTodo(index)}>
                    未完了にする
                  </button>
                </label>
                <button onClick={() => handleDeleteTodo(index)}>×</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
