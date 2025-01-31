"use client";

import Button from "@/components/ui/button";
import BasicModal from "@/components/ui/basic-modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import TaskForm from "../task-form";
import { DialogTitle } from "@headlessui/react";

const CreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Button
        variant="primary"
        onClick={openModal}
        className="flex items-center gap-2"
      >
        <Plus className="w-4" /> New Task
      </Button>
      <BasicModal open={isModalOpen} handleClose={closeModal}>
        <>
          <DialogTitle className="font-medium mb-4 text-lg">
            Create New Task
          </DialogTitle>
          <TaskForm handleClose={closeModal} />
        </>
      </BasicModal>
    </div>
  );
};

export default CreateTask;
