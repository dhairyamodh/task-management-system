import React from "react";
import TaskList from "./list/task-list";
import CreateTask from "./create";

const Tasks = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Tasks</h1>
        <CreateTask />
      </div>
      <TaskList />
    </div>
  );
};

export default Tasks;
