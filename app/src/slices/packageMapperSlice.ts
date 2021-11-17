import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageMapping, addPath, Subcommands, Arguments, Subcommand, Argument } from '../utils/package-mapper';

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
    commandAdd: (state, action: PayloadAction<string>) => {
      if (!state.command) return;
      const pathArr = action.payload.split('/');

      let newCommand: {[ key: string]: object } = {};
      pathArr.reduce((obj, key, i) => {
        const newObj = {};
        obj[key] = newObj;
        return newObj;
      }, newCommand);
      state.command = { ...state.command, ...newCommand }
    },
    commandRemove: (state, action: PayloadAction<string>) => {
      if (!state.command) return;
      const pathArr = action.payload.split('/');

      console.log(state.command[pathArr[0] as keyof PackageMapping]);
      // pathArr.reduce((obj, key, i) => {
      //   const newObj = {};
      //   obj[key] = newObj;
      //   return newObj;
      // }, state.command);
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
