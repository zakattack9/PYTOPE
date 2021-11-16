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
    }
  },
  "arguments": {
    "--version": {
      "value": ""
    }
  },
  "value": "<pathspec>"
}

interface Argument {
  value: string,
  path?: string,
}

interface Arguments {
  [argument: string]: Argument,
}

interface Subcommand {
  value: string,
  arguments?: Arguments,
  subcommands?: Subcommands,
  path?: string,
}

interface Subcommands {
  [subcommand: string]: Subcommand,
}

export interface PackageMapping {
  baseKeyword: string,
  value: string,
  subcommands?: Subcommands,
  arguments?: Arguments,
}

// ignore baseKeyword property
interface Mapping extends Omit<PackageMapping, 'baseKeyword'> {}

// recursive function to add paths to all subcommands and arguments
// paths make finding a specific subcommand or argument faster
export function addPath(mapping: Mapping, path: string[] = []) {
  // add path to subcommand
  if (mapping.subcommands) {
    Object.entries(mapping.subcommands).forEach(([subcommand, obj]) => {
      const PATH = [...path, "subcommands", subcommand];
      obj.path = PATH.join("/");
      addPath(obj, PATH);
    })
  }
  // add path to argument
  if (mapping.arguments) {
    Object.entries(mapping.arguments).forEach(([argument, obj]) => {
      obj.path = [...path, "arguments", argument].join("/");
    })
  }
}
