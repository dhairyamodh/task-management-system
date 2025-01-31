"use client";

import React, { useEffect } from "react";
import TaskCardWrapper from "./task-card-wrapper";
import { useLazyGetTasksQuery } from "@/redux/services/task.api";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/redux/slices/task.slice";
import { RootState } from "@/redux/store";

const TaskList = () => {
  const [getTodos, { isFetching, isLoading, isError }] = useLazyGetTasksQuery();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.task);

  const handleGetTodos = async () => {
    const response = await getTodos();
    if (response?.data?.todos) {
      dispatch(setTasks(response?.data.todos));
    }
  };

  useEffect(() => {
    handleGetTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <div>Error loading tasks!</div>; // Show error state
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col bg-gray-100 rounded-xl">
        <TaskCardWrapper tasks={tasks} loading={isFetching || isLoading} />
      </div>
    </div>
  );
};

export default TaskList;
