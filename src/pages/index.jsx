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
    <div className="max-w-md m-auto p-8">
      <h1 className="text-3xl font-bold">TODO List</h1>
      <div className="mt-10">
        <input
          className="border-2 leading-4 p-2 mr-4 box-border"
          value={todoText}
          placeholder={"Register your TODO!"}
          onChange={handleInputTodoText}
        />
        <button
          className="p-2 text-white leading-4 rounded-md bg-gray-500"
          onClick={handleAddNewTodo}
        >
          Add TODO
        </button>
        <div className="mt-10">
          <h2 className="py-2 px-4 font-bold text-xl text-white bg-gray-700">
            未完了
          </h2>
          <ul className="border-2">
            {incompleteTodoList.length ? (
              incompleteTodoList.map((todo, index) => {
                return (
                  <li
                    key={index}
                    className="flex justify-between align-middle border-t-2 m-auto py-2 px-4"
                  >
                    {todo}
                    <div className="flex align-middle gap-2">
                      <button
                        className="p-2 text-white leading-4 rounded-md bg-gray-500"
                        onClick={() => handleCompleteTodo(index)}
                      >
                        完了にする
                      </button>
                      <button
                        className="px-3 py-1 text-white leading-4 rounded-md bg-gray-500"
                        onClick={() => handleCancelTodo(index)}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <span className="block p-2 text-gray-400">No TODOs...</span>
            )}
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="py-2 px-4 font-bold text-xl text-white bg-gray-700">
            完了
          </h2>
          <ul className="border-2">
            {completeTodoList.length ? (
              completeTodoList.map((todo, index) => {
                return (
                  <li
                    key={index}
                    className="flex justify-between align-middle border-t-2 m-auto py-2 px-4"
                  >
                    {todo}
                    <div className="flex align-middle gap-2">
                      <button
                        className="p-2 text-white leading-4 rounded-md bg-gray-500"
                        onClick={() => handleIncompleteTodo(index)}
                      >
                        未完了にする
                      </button>
                      <button
                        className="px-3 py-1 text-white leading-4 rounded-md bg-gray-500"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <span className="block p-2 text-gray-400">
                All TODOs completed!
              </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
