"use client";

import Button from "@/components/ui/button";
import BasicModal from "@/components/ui/basic-modal";
import { Edit2 } from "lucide-react";
import React, { useState } from "react";
import TaskForm from "../task-form";
import { DialogTitle } from "@headlessui/react";

const EditTask = ({ id }: { id: number }) => {
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

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => {
          openModal(id);
        }}
      >
        <Edit2 className="w-4" />
      </Button>
      <BasicModal open={isModalOpen?.state} handleClose={closeModal}>
        <>
          <DialogTitle className="font-medium mb-4 text-lg">
            Create New Task
          </DialogTitle>
          <TaskForm handleClose={closeModal} id={isModalOpen?.id} />
        </>
      </BasicModal>
    </div>
  );
};

export default EditTask;
