export const mapping = {
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
      }
    }
  },
  "arguments": {
    "--version": {
      "value": ""
    }
  },
  "value": "<path>"
}

interface Argument {
  value: string,
}

interface Arguments {
  [argument: string]: Argument,
}

interface Subcommand {
  arguments: Arguments,
  subcommands: Subcommands,
  value: string,
  path?: string,
}

interface Subcommands {
  [subcommand: string]: Subcommand,
}

export interface PackageMapping {
  baseKeyword: string,
  subcommands: Subcommands,
  arguments: Arguments,
  value: string,
}

function addPath(mapping: PackageMapping, path = []) {
  if (mapping.subcommands) {
    Object.entries(mapping.subcommands).forEach(([key, value]) => {
      const PATH = [...path, "subcommands", key];
      value.path = PATH.join("/")
      // addPath(value, PATH)
    })
  }
}
