// Component for a individual todo
import circleIcon from "../icons/circle_icon.svg";
import checkIcon from "../icons/check_icon.svg";
import { FiEdit } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";

const Todo = ({ todo, todoList, setTodoList, editTodo, setEditTodo }) => {
  // Changes the completion state (completed: true or false)
  const handleComplete = () => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  // Deletes selected todo from the list
  const handleDelete = () => {
    setTodoList(todoList.filter((item) => item.id !== todo.id));
  };

  return (
    <div className="bg-[#262626] p-4 text-sm font-normal text-[#F2F2F2] flex gap rounded-[8px]">
      {/* Button to set the task as completed or incomplete */}
      <button
        className="h-6 w-6 flex justify-center items-center"
        onClick={handleComplete}
      >
        {!todo.completed ? (
          <img src={circleIcon} alt="" className="h-[1.125rem] w-[1.125rem]" />
        ) : (
          <img src={checkIcon} alt="" className="h-[1.125rem] w-[1.125rem]" />
        )}
      </button>

      {/* Todo text */}
      <span
        className={`w-full ml-4 mr-4 ${
          todo.completed ? "text-[#808080] line-through" : ""
        }`}
      >
        {todo.text}
      </span>

      {!editTodo && (
        // Buttons only shows while not in edit mode

        <>
          {/* Edit todo button */}
          <button
            className="h-6 w-6 flex justify-center items-center mr-4 group"
            onClick={() => setEditTodo(todo)}
          >
            <FiEdit className="h-[1.125rem] w-[1.125rem] text-[#808080] group-hover:text-[#3B7DB8]" />
          </button>

          {/* Delete todo button */}
          <button
            className="h-6 w-6 flex justify-center items-center group"
            onClick={handleDelete}
          >
            <TbTrash className="h-5 w-5 text-[#808080] group-hover:text-[#D44245]" />
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
