interface Themes {
  [name: string]: Theme,
}

interface Theme {
  'primary': HSL,
  'secondary': HSL,
  'primary-text': HSL,
  'secondary-text': HSL,
}

export interface HSL {
  h: number,
  s: number, // converted to percent string later
  l: number, // converted to percent string later
}

const THEMES: Themes = {
  'b&w': {
    'primary': { h: 0, s: 0, l: 73 },
    'secondary': { h: 0, s: 0, l: 73 },
    'primary-text': { h: 0, s: 0, l: 21 },
    'secondary-text': { h: 0, s: 0, l: 21 },
  },
  'slate': {
    'primary': { h: 210, s: 12, l: 29 },
    'secondary': { h: 187, s: 9, l: 60 },
    'primary-text': { h: 209, s: 20, l: 23 },
    'secondary-text': { h: 200, s: 39, l: 95 },
  },
  'creamsicle': {
    'primary': { h: 28, s: 100, l: 53 },
    'secondary': { h: 36, s: 100, l: 53 },
    'primary-text': { h: 199, s: 26, l: 24 },
    'secondary-text': { h: 64, s: 100, l: 88 },
  },
  'fern': {
    'primary': { h: 140, s: 15, l: 27 },
    'secondary': { h: 130, s: 22, l: 67 },
    'primary-text': { h: 18, s: 21, l: 23 },
    'secondary-text': { h: 28, s: 60, l: 95 },
  },
  'banana': {
    'primary': { h: 35, s: 10, l: 34 },
    'secondary': { h: 26, s: 13, l: 44 },
    'primary-text': { h: 73, s: 24, l: 20 },
    'secondary-text': { h: 51, s: 66, l: 75 },
  },
  'mint': {
    'primary': { h: 162, s: 43, l: 37 },
    'secondary': { h: 167, s: 33, l: 52 },
    'primary-text': { h: 16, s: 42, l: 32 },
    'secondary-text': { h: 154, s: 100, l: 96 },
  },
  'wood': {
    'primary': { h: 32, s: 31, l: 38 },
    'secondary': { h: 39, s: 33, l: 31 },
    'primary-text': { h: 34, s: 50, l: 25 },
    'secondary-text': { h: 36, s: 100, l: 89 },
  },
  'pebble': {
    'primary': { h: 209, s: 15, l: 59 },
    'secondary': { h: 191, s: 18, l: 59 },
    'primary-text': { h: 209, s: 20, l: 23 },
    'secondary-text': { h: 203, s: 16, l: 15 },
  },
  'rose': {
    'primary': { h: 354, s: 50, l: 37 },
    'secondary': { h: 353, s: 51, l: 46 },
    'primary-text': { h: 344, s: 59, l: 17 },
    'secondary-text': { h: 19, s: 95, l: 80 },
  },
  'clay': {
    'primary': { h: 14, s: 50, l: 44 },
    'secondary': { h: 19, s: 57, l: 54 },
    'primary-text': { h: 19, s: 74, l: 20 },
    'secondary-text': { h: 39, s: 91, l: 91 },
  },
  'glacier': {
    'primary': { h: 189, s: 37, l: 68 },
    'secondary': { h: 182, s: 45, l: 66 },
    'primary-text': { h: 208, s: 38, l: 24 },
    'secondary-text': { h: 231, s: 14, l: 28 },
  },
}

export default THEMES;
