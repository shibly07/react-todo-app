// Collection of all the todos
import Tasks from "./Tasks";
import Todo from "./Todo";

const TodoList = ({
  todoList,
  setTodoList,
  filteredTodoList,
  editTodo,
  setEditTodo,
  statusFilter,
}) => {
  return (
    <div className="mt-20 md:mt-[5.625rem] text-white flex flex-col items-center">
      <div className="w-2/3 md:w-[46rem]">
        {/* Category of tasks and numbers */}
        <section className="flex justify-between font-bold items-center">
          <Tasks
            currentTask={"All tasks"}
            currentTaskCount={statusFilter["All"].length}
          />
          <Tasks
            currentTask={"Completed"}
            currentTaskCount={statusFilter["Completed"].length}
            totalTaskCount={todoList.length}
          />

          <Tasks
            currentTask={"Incomplete"}
            currentTaskCount={statusFilter["Incomplete"].length}
            totalTaskCount={todoList.length}
          />
        </section>

        {/* Mapping over the list and rendering a Todo component for each item*/}
        <section className="mt-6 ">
          <ul className="flex flex-col gap-3">
            {filteredTodoList.map((todo) =>
              //Shows full list when the user is not editing
              !editTodo ? (
                <li key={todo.id}>
                  <Todo
                    todo={todo}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    setEditTodo={setEditTodo}
                  />
                </li>
              ) : todo.id === editTodo.id ? (
                // Only shows the todo which is being edited
                <li key={todo.id}>
                  <Todo
                    todo={todo}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                  />
                </li>
              ) : (
                // Hides the rest of the todos except the one that is being edited
                ""
              )
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TodoList;
