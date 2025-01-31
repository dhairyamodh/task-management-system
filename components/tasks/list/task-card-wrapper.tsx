import { useUpdateTaskMutation } from "@/redux/services/task.api";
import { updateTask } from "@/redux/slices/task.slice";
import { Task } from "@/types/task.types";
import React from "react";
import { useDispatch } from "react-redux";
import EditTask from "../edit";
import DeleteTask from "../delete";
import Checkbox from "../../ui/Checkbox";
import { toast } from "react-toastify";

interface TaskCardWrapperProps {
  tasks: Task[];
  loading: boolean;
}

const TaskCardWrapper: React.FC<TaskCardWrapperProps> = ({
  tasks,
  loading,
}) => {
  const dispatch = useDispatch();

  const [updateTaskCompletion] = useUpdateTaskMutation();

  // Handle task completion change
  const handleCheckboxChange = async (task: Task) => {
    const taskId = task?.id;
    const completed = task?.completed;
    try {
      // Call the API to update the task completion status
      const updatedTask = await updateTaskCompletion({
        taskId,
        completed: !completed,
      }).unwrap();

      dispatch(updateTask(updatedTask));
      toast.success("Task successfully completed!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Something Went Wrong!");
    }
  };

  console.log(loading);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                className="border border-gray-200 bg-white rounded-xl p-2 px-3 text-sm"
                key={index}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center h-full">
                    <div className="w-72 h-8 rounded-md bg-gray-300" />
                  </div>
                  <div className="flex gap-3 items-center h-full">
                    <div className="w-[1px] h-6 bg-gray-200" />
                    <div className="w-10 h-10 rounded-md bg-gray-300" />
                    <div className="w-10 h-10 rounded-md bg-gray-300" />
                  </div>
                </div>
              </div>
            ))
          : tasks.map((task, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white rounded-xl p-2 px-3 text-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-center h-full">
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task)}
                    />
                    <span className={task.completed ? `line-through` : ""}>
                      {task?.todo}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center h-full">
                    <div className="w-[1px] h-6 bg-gray-200" />
                    <DeleteTask id={task.id} />
                    <EditTask id={task.id} />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TaskCardWrapper;
