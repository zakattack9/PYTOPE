import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageMapping, addPath, Subcommands, Arguments, Subcommand, Argument } from '../utils/package-mapper';
import { Mapping } from '../utils/package-mapper';

interface PackageMapperState {
  command: PackageMapping | null,
  currPackage: PackageMapping | null,
}

const initialState: PackageMapperState = {
  command: null,
  currPackage: null,
}

// type StrObj = {[ key: string ]: StrObj };

export const packageMapperSlice = createSlice({
  name: 'packageMapper',
  initialState,
  reducers: {
    commandAdd: (state, action: PayloadAction<string>) => {
      if (!state.command || !state.currPackage) return;
      
      const pathArr = action.payload.split('/');

      console.log(state)

      interface ReducedPackageMapping extends Omit<PackageMapping, 'baseKeyword' | 'value'> {};
      type ObjTypes = ReducedPackageMapping | Subcommands | Arguments | Omit<Subcommand, 'value' | 'path'> | Omit<Argument, 'value'>;
      type KeyTypes = keyof ReducedPackageMapping | string;
      const targetObj = pathArr.reduce((obj: ObjTypes, key: KeyTypes): ObjTypes => {
        console.log(obj)
        console.log(key as keyof ObjTypes)
        console.log(obj[key as keyof ObjTypes])
        return obj[key as keyof ObjTypes];
      }, state.currPackage);

      // let targetObj;
      // pathArr.forEach((key: string) => {
      //   if (state.currPackage) {
      //     targetObj = state.currPackage[key];
      //   }
      // });

      console.log(targetObj);

      // pathArr.reduce((command: object, key: string, i) => {
      //   let obj = {};
      //   if (i === pathArr.length - 1) {
      //     obj = currPackage
      //   }
      //   Object.assign(command, { [key]: obj });
      //   return obj;
      // }, state.command);
    },
    commandRemove: (state, action: PayloadAction<string>) => {
      console.log("REMOVE", action.payload)
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
