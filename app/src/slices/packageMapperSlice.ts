import { createSlice } from '@reduxjs/toolkit';

export const packageMapperSlice = createSlice({
  name: 'packageMapper',
  initialState: {
    command: [null],
    currPackage: null,
  },
  reducers: {
    addBaseKeyword: (state, action) => {
      state.command[0] = action.payload;
    },
    addSubcommand: (state, action) => {

    },
    loadPackage: (state, action) => {

    }
  },
});

export const { 
  addBaseKeyword, 
  addSubcommand,
  loadPackage,
} = packageMapperSlice.actions;

export default packageMapperSlice.reducer;
