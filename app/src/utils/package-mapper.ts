export const mapping: PackageMapping = {
  "baseKeyword": "git",
  "subcommands": {
    "submodule": {
      "arguments": {
        "--quiet": {
          "value": ""
        }
      },
      "value": "<branch-name>",
      "subcommands": {
        "set-url" : {
          "arguments": {},
          "value": "<newurl>"
        }
      }
    },
    "commit": {
      "arguments": {
        "-m": {
          "value": "<message>"
        },
        "-a": {
          "value": ""
        }
      },
      "value": "<path>"
    },
    "add": {
      "arguments": {},
      "value": "<path>"
    },
    "push": {
      "arguments": {},
      "value": "<path>"
    }
  },
  "arguments": {
    "--version": {
      "value": ""
    },
    "-C": {
      "value": "<path>"
    }
  },
  "value": "<pathspec>"
}

export interface Argument {
  value: string,
  path?: string,
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

export interface Subcommands {
  [subcommand: string]: Subcommand,
}

export interface PackageMapping {
  baseKeyword: string,
  value: string,
  subcommands?: Subcommands,
  arguments?: Arguments,
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

export function getObject(mapping: PackageMapping, path: string) {
  interface ReducedPackageMapping extends Omit<PackageMapping, 'baseKeyword' | 'value'> {};
  type ObjTypes = ReducedPackageMapping | Subcommands | Arguments | Omit<Subcommand, 'value' | 'path'> | Omit<Argument, 'value'>;
  type KeyTypes = keyof ReducedPackageMapping | string;
  type ReturnTypes = Subcommand & Argument;

  const pathArr = path.split('/');
  const targetObj = pathArr.reduce((obj: ObjTypes, key: KeyTypes): ObjTypes => {
    return obj[key as keyof ObjTypes];
  }, mapping);
  return targetObj as ReturnTypes;
}
