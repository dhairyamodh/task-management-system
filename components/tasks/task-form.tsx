"use client";

import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/services/task.api";
import { addTask, updateTask } from "@/redux/slices/task.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button";
import { toast } from "react-toastify";

interface TaskFormProps {
  handleClose: () => void;
  id?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose, id }) => {
  const [title, setTitle] = useState<string>("");
  const [createTask, { isLoading }] = useAddTaskMutation();
  const [updateTaskFunc, { isLoading: isUpadting }] = useUpdateTaskMutation();
  const dispatch = useDispatch<AppDispatch>();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const { tasks } = useSelector((state: RootState) => state.task);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return; // Prevent submitting if title is empty

    try {
      if (id) {
        const updatedTask = await updateTaskFunc({
          taskId: id,
          todo: title,
        }).unwrap();

        dispatch(updateTask(updatedTask));
        toast.success("Task updated sucessfully");
      } else {
        const addedTask = await createTask({
          todo: title,
          completed: false,
          userId: 5,
        }).unwrap();

        dispatch(
          addTask({ ...addedTask, id: Math.floor(Math.random() * 1000) + 1 })
        );
        toast.success("Task added sucessfully");
      }
      setTitle("");
      handleClose();
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Something Went Wrong!");
    }
  };

  useEffect(() => {
    const title = tasks?.find((task) => task.id === id)?.todo || "";
    setTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 flex-col items-center w-full"
      >
        <input
          type="text"
          autoFocus
          value={title}
          onChange={handleTitleChange}
          placeholder="Task Name"
          className="border text-sm p-2 rounded-md flex-grow w-full"
        />
        <div className="flex gap-2">
          {id ? (
            <Button type="submit" variant="primary" disabled={isUpadting}>
              {isUpadting ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add"}
            </Button>
          )}
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
