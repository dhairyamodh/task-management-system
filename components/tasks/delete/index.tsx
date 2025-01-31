"use client";

import Button from "@/components/ui/button";
import BasicModal from "@/components/ui/basic-modal";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useDeleteTaskMutation } from "@/redux/services/task.api";
import { deleteTask } from "@/redux/slices/task.slice";
import { toast } from "react-toastify";

const DeleteTask = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState({
    id: -1,
    state: false,
  });

  const openModal = (id: number) =>
    setIsModalOpen({
      state: true,
      id,
    });
  const closeModal = () =>
    setIsModalOpen({
      id: -1,
      state: false,
    });
  const dispatch = useDispatch<AppDispatch>();
  const [deleteTaskFunc, { isLoading }] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    try {
      const taskId = isModalOpen?.id;
      // Call the API to delete the task
      await deleteTaskFunc({ taskId }); // Assuming there's an API call for deleting a task

      // Dispatch the delete action to remove the task from Redux
      dispatch(deleteTask(taskId));
      closeModal();
      toast.success("Task Deleted.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="hover:!bg-red-700"
        onClick={() => {
          openModal(id);
        }}
      >
        <Trash className="w-4" />
      </Button>
      <BasicModal open={isModalOpen?.state} handleClose={closeModal}>
        <div className="">
          <DialogTitle
            as="h3"
            className="text-base font-semibold text-gray-900"
          >
            Delete Task
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete the task?
            </p>
          </div>

          <div className="flex gap-2 mt-3">
            <Button
              type="submit"
              variant="primary"
              onClick={handleDeleteTask}
              disabled={isLoading}
            >
              {isLoading ? "Deleting.." : "Delete"}
            </Button>

            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default DeleteTask;
