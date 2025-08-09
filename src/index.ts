import Spectrum from './spectrum';

export { default as adjustHsl } from './methods/adjustHsl';
export { default as adjustHwb } from './methods/adjustHwb';
export { default as adjustRgb } from './methods/adjustRgb';
export { default as colorMix } from './methods/colorMix';
export { default as createPalette } from './methods/createPalette';
export { default as getSplitComplementary } from './methods/getSplitComplementary';
export { default as getTriadic } from './methods/getTriadic';
export { default as hexToRgb } from './methods/hexToRgb';
export { default as hslToHwb } from './methods/hslToHwb';
export { default as hslToRgb } from './methods/hslToRgb';
export { default as hwbToHsl } from './methods/hwbToHsl';
export { default as invert } from './methods/invert';
export { default as onBgColor } from './methods/onBgColor';
export { default as rgbObjToHex } from './methods/rgbObjToHex';
export { default as rgbObjToHsl } from './methods/rgbObjToHsl';
export { default as setHsl } from './methods/setHsl';
export { default as setHwb } from './methods/setHwb';
export { default as setRgb } from './methods/setRgb';

export type {
  ColorSpace,
  CssNamedColor,
  HslObj,
  HwbObj,
  RgbObj
} from './spectrum.types';

export default Spectrum;
