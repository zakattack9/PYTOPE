import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PackageMapping, addPath, getPathType, PathType } from '../utils/package-mapper';

interface Command {
  baseKeyword: string,
  value: string,
  paths: {
    subcommands: Array<string>,
    arguments: Array<string>
  },
}

interface AllPackages {
  [name: string]: PackageMapping
}

export interface PackageMapperState {
  command: Command | null,
  currPackage: PackageMapping | null,
  allPackages: AllPackages,
}

const initialState: PackageMapperState = {
  command: null,
  currPackage: null,
  allPackages: {},
}

export const packageMapperSlice = createSlice({
  name: 'packageMapper',
  initialState,
  reducers: {
    commandAdd: (state, action: PayloadAction<string>) => {
      if (!state.command) return;
      const path = action.payload;
      const pathType = getPathType(path);
      state.command.paths[pathType].push(path);
      state.command.paths[pathType] = state.command.paths[pathType].sort();
      // ensure only arguments for the last clicked, deepest subcommand are added
      if (pathType === 'subcommands')
        state.command.paths.arguments = [];
    },
    commandRemove: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      const pathTypes: Array<PathType> = ['subcommands', 'arguments'];
      // remove all dependent/nested subcommands and arguments if a higher level subcommand is removed
      pathTypes.forEach((pathType) => {
        if (!state.command) return;
        state.command.paths[pathType] = state.command.paths[pathType].filter(currPath => !currPath.startsWith(path));
        state.command.paths[pathType] = state.command.paths[pathType].sort();
      })
    },
    commandReset: (state) => {
      if (!state.command) return;
      state.command.paths = {
        subcommands: [],
        arguments: []
      };
    },
    loadPackage: (state, action: PayloadAction<PackageMapping>) => {
      const pkgMappingClone = JSON.parse(JSON.stringify(action.payload));
      const { baseKeyword, value } = pkgMappingClone;
      addPath(pkgMappingClone);
      state.currPackage = pkgMappingClone;
      state.command = {
        baseKeyword,
        value,
        paths: {
          subcommands: [],
          arguments: [],
        },
      };
      state.allPackages[baseKeyword] = pkgMappingClone;
    },
    switchPackage: (state, action: PayloadAction<string>) => {
      const pkgName = action.payload;
      const pkgData = state.allPackages[pkgName];
      const { baseKeyword, value } = pkgData;
      state.currPackage = pkgData;
      state.command = {
        baseKeyword,
        value,
        paths: {
          subcommands: [],
          arguments: [],
        },
      };
    }
  },
});

export const { 
  commandAdd, 
  commandRemove,
  commandReset,
  loadPackage,
  switchPackage,
} = packageMapperSlice.actions;

export default packageMapperSlice.reducer;
