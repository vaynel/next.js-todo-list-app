import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import loadingReducer from './loadingSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
