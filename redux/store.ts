import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./services/task.api";
import taskReducer from "./slices/task.slice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for dispatch
export type AppDispatch = typeof store.dispatch;
