import {
  Task,
  TaskAddRequest,
  TaskDeleteRequest,
  TaskResponse,
  TaskUpdateRequest,
} from "@/types/task.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service
export const taskApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query<TaskResponse, void>({
      query: () => ({
        url: "/todos",
      }),
    }),
    addTask: builder.mutation<Task, TaskAddRequest>({
      query: (data) => ({
        url: "/todos/add",
        method: "POST",
        body: data,
      }),
    }),
    updateTask: builder.mutation<Task, TaskUpdateRequest>({
      query: ({ taskId, todo, completed }) => ({
        url: `/todos/${taskId}`,
        method: "PUT",
        body: { todo, completed },
      }),
    }),
    deleteTask: builder.mutation<Task, TaskDeleteRequest>({
      query: ({ taskId }) => ({
        url: `/todos/${taskId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for the endpoints
export const {
  useAddTaskMutation,
  useLazyGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
