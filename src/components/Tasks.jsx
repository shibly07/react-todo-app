// Component for showing the name and the number of the tasks of the selected categories
const Tasks = ({ currentTask, currentTaskCount, totalTaskCount }) => {
  return (
    <div className="flex gap-2">
      <span
        className={`${
          currentTask === "All tasks" ? "text-[#4EA8DE]" : "text-[#8284FA]"
        } text-sm`}
      >
        {currentTask}
      </span>

      <span className="px-2 py-[2px] bg-[#333333] flex items-center justify-center rounded-[999px] text-xs">
        {currentTask === "All tasks"
          ? `${currentTaskCount}`
          : totalTaskCount > 0
          ? `${currentTaskCount} of ${totalTaskCount}`
          : `${currentTaskCount}`}
      </span>
    </div>
  );
};

export default Tasks;
