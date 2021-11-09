import { configureStore } from '@reduxjs/toolkit';
import packageMapperReducer from './slices/packageMapperSlice';

export default configureStore({
  reducer: {
    packageMapper: packageMapperReducer,
  },
});
