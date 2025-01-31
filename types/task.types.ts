export interface Task {
  todo: string;
  userId: number;
  completed: boolean;
  id: number;
}

export type TaskResponse = {
  todos: Task[];
  total: number;
};

export interface TaskUpdateRequest {
  taskId: number;
  todo?: string;
  completed?: boolean;
}

export type TaskDeleteRequest = Pick<TaskUpdateRequest, "taskId">;

export type TaskAddRequest = Omit<Task, "id">;
