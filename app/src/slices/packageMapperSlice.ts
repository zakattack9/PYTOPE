import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageMapping, addPath } from '../utils/package-mapper';

interface PackageMapperState {
  command: PackageMapping | null,
  currPackage: PackageMapping | null,
}

const initialState: PackageMapperState = {
  command: null,
  currPackage: null,
}

export const packageMapperSlice = createSlice({
  name: 'packageMapper',
  initialState,
  reducers: {
    commandAdd: (state, action: PayloadAction) => {
      // state.command[0] = action.payload;
    },
    commandRemove: (state, action: PayloadAction) => {

    },
    commandReset: (state) => {

    },
    loadPackage: (state, action: PayloadAction<PackageMapping>) => {
      const pkgMappingClone = JSON.parse(JSON.stringify(action.payload));
      const { baseKeyword, value } = pkgMappingClone;
      addPath(pkgMappingClone);
      state.currPackage = pkgMappingClone;
      state.command = {
        baseKeyword,
        value,
      }
    }
  },
});

export const { 
  commandAdd, 
  commandRemove,
  commandReset,
  loadPackage,
} = packageMapperSlice.actions;

export default packageMapperSlice.reducer;
