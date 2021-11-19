import { PackageMapperState } from "../slices/packageMapperSlice";

export interface PackageMapping {
  baseKeyword: string,
  value: string,
  subcommands?: Subcommands,
  arguments?: Arguments,
}

export interface Subcommands {
  [subcommand: string]: Subcommand,
}

export interface Arguments {
  [argument: string]: Argument,
}

export interface Subcommand {
  value: string,
  arguments?: Arguments,
  subcommands?: Subcommands,
  path?: string,
}

export interface Argument {
  value: string,
  path?: string,
}

// ignore baseKeyword property
export interface Mapping extends Omit<PackageMapping, 'baseKeyword'> {}

// recursive function to add paths to all subcommands and arguments
// paths make finding a specific subcommand or argument faster
// a path is a sequence of object keys to get to a specific value in an object
// object keys are separated by a / and combined into a single string to make a path
// when sorting an array of paths, higher level paths will appear before deeper paths
export function addPath(mapping: Mapping, path: string[] = []) {
  // add path to subcommand
  if (mapping.subcommands) {
    Object.entries(mapping.subcommands).forEach(([subcommand, obj]) => {
      const PATH = [...path, 'subcommands', subcommand];
      obj.path = PATH.join('/');
      addPath(obj, PATH);
    })
  }
  // add path to argument
  if (mapping.arguments) {
    Object.entries(mapping.arguments).forEach(([argument, obj]) => {
      obj.path = [...path, 'arguments', argument].join('/');
    })
  }
}

export type PathType = "subcommands" | "arguments";
export function getPathType(path: string): PathType {
  const pathArr = path.split('/');
  return pathArr[pathArr.length - 2] as PathType;
}

export function getName(path: string) {
  return path.split('/').pop() || '';
}

export function getPathPrefix(path: string) {
  const pathArr = path.split('/');
  return pathArr.slice(0, -1).join('/') || '';
}

export function getValuePath(path: string | null | undefined) {
  if (!path) return '';
  const VALUE_KEYWORD = 'value';
  return `${path}/${VALUE_KEYWORD}`;
}

export function getObject(mapping: PackageMapping, path: string) {
  interface ReducedPackageMapping extends Omit<PackageMapping, 'baseKeyword' | 'value'> {};
  type ObjType = ReducedPackageMapping | Subcommands | Arguments | Omit<Subcommand, 'value' | 'path'> | Omit<Argument, 'value'>;
  type KeyType = keyof ReducedPackageMapping | string;
  type ReturnType = Subcommand & Argument;

  const pathArr = path.split('/');
  const targetObj = pathArr.reduce((obj: ObjType, key: KeyType): ObjType => {
    return obj[key as keyof ObjType];
  }, mapping);
  return targetObj as ReturnType;
}

export function getCommand(state: PackageMapperState) {
  const { currPackage, command } = state;
  if (!currPackage || !command) return;

  const baseKeyword = command.baseKeyword;
  const value = localStorage.getItem(getValuePath(baseKeyword));
  const subcmds = command.paths.subcommands.map(path => getName(path)).join(' ');
  const args = command.paths.arguments.map(path => {
    const argName = getName(path);
    const argValue = localStorage.getItem(getValuePath(path));
    const hasSpace = argName.slice(-1) !== '=';
    return argValue ? `${argName}${hasSpace ? ' ' : ''}${argValue}` : argName;
  }).join(' ');

  let fullCommand = baseKeyword;
  if (subcmds) fullCommand += ` ${subcmds}`;
  if (args) fullCommand += ` ${args}`;
  if (value) fullCommand += ` ${value}`;
  return fullCommand;
}
