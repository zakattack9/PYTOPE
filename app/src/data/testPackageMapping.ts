import { PackageMapping } from "../utils/package-mapper";

export const mapping: PackageMapping = {
  "baseKeyword": "git",
  "subcommands": {
    "init": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "clone": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "add": {
      "arguments": {
        "--version": {
          "value": "",
        },
        "-f": {
          "value": "",
        },
        "-i": {
          "value": "",
        },
        "--interactive": {
          "value": "",
        },
        "--patch": {
          "value": "",
        },
        "--refresh": {
          "value": "",
        },
        "--ignore-errors": {
          "value": "",
        },
        "--pathspec-from-file=": {
          "value": "<file>",
        },
      },
      "subcommands": {},
      "value": "<pathspec>",
    },
    "status": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "diff": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "commit": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "branch": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "checkout": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "merge": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "log": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "fetch": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "pull": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "push": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "config": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "remote": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "submodule": {
      "arguments": {
        "--quiet": {
          "value": "",
        },
      },
      "subcommands": {
        "add": {
          "arguments": {
            "--force": {
              "value": "",
            },
            "-b": {
              "value": "<branch>",
            },
            "--name": {
              "value": "",
            },
          },
          "subcommands": {},
          "value": "<pathspec>",
        },
        "status": {
          "subcommands": {},
          "value": "<pathspec>",
          "arguments": {},
        },
        "init": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "deinit": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "update": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "set-branch": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "set-url": {
          "arguments": {},
          "subcommands": {},
          "value": "<newurl>",
        },
        "summary": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "foreach": {
          "arguments": {},
          "subcommands": {},
          "value": "<command>",
        },
        "sync": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
        "absorbgitdirs": {
          "arguments": {},
          "subcommands": {},
          "value": "<pathspec>",
        },
      },
      "value": "<pathspec>",
    },
    "bisect": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
    "help": {
      "arguments": {},
      "subcommands": {},
      "value": "<pathspec>",
    },
  },
  "arguments": {
    "--version": {
      "value": "",
    },
    "--help": {
      "value": "",
    },
    "-C": {
      "value": "<path>",
    },
    "--exec-path=": {
      "value": "<path>",
    },
    "--html-path": {
      "value": "",
    },
  },
  "value": "<pathspec>"
}

