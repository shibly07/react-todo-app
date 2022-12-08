// This is the main component consisting of all other components

import { useEffect, useState } from "react";

import Form from "./Form";
import todoIcon from "../icons/todo_icon.svg";
import TodoList from "./TodoList";

const Main = () => {
  // Main list for todos
  const [todoList, setTodoList] = useState([]);

  // State for editing todos
  const [editTodo, setEditTodo] = useState("");

  // State for categories of the todos (All, COmpleted, Incomplete)
  const [selectedStatus, setSelectedStatus] = useState("All");

  // State for rendering todos that match selected category
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  // Filter for categorizing todos
  const statusFilter = {
    All: todoList,
    Completed: todoList.filter((todo) => todo.completed),
    Incomplete: todoList.filter((todo) => !todo.completed),
  };

  // Runs once when page starts and loads existing data from local storage
  useEffect(() => {
    const getLocalData = () => {
      const localTodo = JSON.parse(window.localStorage.getItem("todoList"));

      if (localTodo) {
        setTodoList(localTodo);
      }
    };

    getLocalData();
  }, []);

  // Constantly checks for change in data
  useEffect(() => {
    // filters data to be rendered according to the category
    const handlefilter = () => {
      return setFilteredTodoList(statusFilter[selectedStatus]);
    };

    // saves to local storage
    const setLocalData = () => {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    handlefilter();
    setLocalData();
  }, [selectedStatus, todoList]);

  return (
    <>
      <div className="min-h-screen w-full bg-[#1A1A1A]">
        <div className="h-[130px] md:h-[200px] bg-[#0D0D0D] flex justify-center items-center">
          <div className="h-[70] w-[90px]  md:h-[96px] md:w-[126px] flex justify-between items-center">
            <img
              src={todoIcon}
              alt="todo-icon"
              className="h-[48px] w-[126px]"
            />
          </div>
        </div>

        {/* Form section with text input and buttons */}
        <Form
          todoList={todoList}
          setTodoList={setTodoList}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Todolist : A collection of todos */}
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          filteredTodoList={filteredTodoList}
          statusFilter={statusFilter}
        />
      </div>
    </>
  );
};

export default Main;
