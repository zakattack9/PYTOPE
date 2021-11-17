import { PackageMapping } from "../utils/package-mapper";

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
