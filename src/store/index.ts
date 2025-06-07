import { configureStore } from '@reduxjs/toolkit';
import coctailReducer from './coctailSlice';

export const store = configureStore({
  reducer: {
    coctails: coctailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


