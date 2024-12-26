//! must not add another type in this file, only add slug into SlugGroup=> because it related to file build.js, multi-build.js, please let "keyringpasskeywallet" at the end of the list
export type SlugGroup =
  | 'egglegamewallet'
  | 'egglepasskeywallet'
  | 'egglepasskeywallet-decard'
  | 'meteornrun'
  | 'meteornrun-decard'
  | 'keyringsmart'
  | 'passkeywallet'
  | 'keyringpasskeywallet';
