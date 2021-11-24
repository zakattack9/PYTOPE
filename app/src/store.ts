import { configureStore } from '@reduxjs/toolkit';
import packageMapperReducer from './slices/packageMapperSlice';

export const store = configureStore({
  reducer: {
    packageMapper: packageMapperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
