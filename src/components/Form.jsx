import { useEffect, useState } from "react";

import plusIcon from "../icons/plus_icon.svg";
import { BsCheckCircle } from "react-icons/bs";

const Form = ({
  todoList,
  setTodoList,
  editTodo,
  setEditTodo,
  setSelectedStatus,
}) => {
  // Saves text value
  const [todo, setTodo] = useState("");

  // Keeps same id and completion property but updates text
  const updateTodo = (text, id, completed) => {
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { text, id, completed } : todo
    );

    // Updates list with new text
    setTodoList(newTodo);

    // Sets edit state to blank after update completion
    setEditTodo("");
  };

  // Adds new todos in a list
  const addTodo = (e) => {
    // Prevents page from refreshing
    e.preventDefault();

    // Trims text of unwanted whitespace at the beginning or the end of the string
    const trimmedTodo = todo.trim();

    // Checks if user is not editing and not trying to input only whitespace characters
    if (!editTodo && trimmedTodo) {
      // Keeps the old todos and inserts new todo
      setTodoList((todolist) => [
        ...todolist,
        {
          id: Math.floor(Math.random() * 100000),
          text: trimmedTodo,
          completed: false,
        },
      ]);
    } else {
      // Updates the text if user is editing
      updateTodo(todo, editTodo.id, editTodo.completed);
    }
    // Empties text box after submitting
    setTodo("");
  };

  // Checks if user is editing and shows the value in the text box to edit
  useEffect(() => {
    const editTodoText = () => {
      if (editTodo) {
        setTodo(editTodo.text);
      } else {
        setTodo("");
      }
    };

    editTodoText();
  }, [setTodo, editTodo]);

  // Deletes all data from the list and the local storage
  const handleReset = (e) => {
    localStorage.clear();
    setTodoList([]);
  };

  return (
    <form
      onSubmit={addTodo}
      className=" h-[3.375rem] w-2/3 md:w-[46rem] flex flex-col gap-2 md:flex-row md:gap-4 items-center absolute left-1/2 transform -translate-x-1/2 top-[6.25rem] md:top-[10.9375rem]"
    >
      {/* Input text box */}
      <div className="flex md:w-full gap-2 md:gap-4 items-center h-[3.375rem]">
        <input
          type="text"
          placeholder="Add a new task"
          className="px-4 h-full w-full md:h-[3.375rem] text-white bg-[#262626] rounded-md "
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />

        {/* Button for submission */}
        <button
          type="submit"
          className={`h-[3.25rem] w-28 ${
            !editTodo ? "bg-[#1E6F9F]" : "bg-[#08AB4B]"
          } text-white rounded-md flex justify-center items-center gap-2 px-4`}
        >
          {!editTodo ? (
            // Render components when the user is not editing
            <>
              <span className="text-sm font-bold">Create</span>
              <img src={plusIcon} alt="" className="h-4 w-4" />
            </>
          ) : (
            // Render components when the user is editing
            <>
              <span className="text-sm font-bold">Save</span>
              <BsCheckCircle className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <div className="flex justify-center items-center gap-2 md:gap-4">
        {!editTodo && (
          // Only show when the user is not editing
          <>
            {/* Category selection button */}
            <select
              name="todo-status"
              id="todo-status"
              className="h-[3.25rem] px-2 text-sm bg-blue-600 text-white rounded-md font-bold text-center"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>

            {/* Reset button */}
            <button
              className="h-[3.25rem] w-24 bg-red-800 text-white px-2 text-sm rounded-md font-bold text-center"
              onClick={handleReset}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
