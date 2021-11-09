import { createSlice } from '@reduxjs/toolkit';

export const packageMapperSlice = createSlice({
  name: 'packageMapper',
  initialState: {
    command: [null]
  },
  reducers: {
    addBaseKeyword: (state, action) => {
      state.command[0] = action.payload;
    },
    addSubcommand: (state, action) => {

    }
  },
});

export const { addBaseKeyword, addSubcommand } = packageMapperSlice.actions;

export default packageMapperSlice.reducer;
