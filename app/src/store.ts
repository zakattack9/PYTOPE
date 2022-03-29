import { configureStore } from '@reduxjs/toolkit';
import packageMapperReducer from './slices/packageMapperSlice';
import testDesignerReducer from './slices/testDesignerSlice';

export const store = configureStore({
  reducer: {
    packageMapper: packageMapperReducer,
    testDesigner: testDesignerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
