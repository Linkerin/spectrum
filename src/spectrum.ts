import { ColorSpace, HslObj, InputValue, RgbObj } from './spectrum.types';
import hexToRgb from './methods/hexToRgb';
import hslToRgb from './methods/hslToRgb';
import rgbObjToHex from './methods/rgbObjToHex';
import rgbObjToHsl from './methods/rgbObjToHsl';
import _validateValue from './utils/_validateValue';

/**
 * Represents a color in different color spaces (hex, hsl, rgb).
 * Spectrum instances can be used with various methods
 * to convert between color spaces and access individual color channels.
 *
 * @example
 * // Create a Spectrum instance from a hex color value
 * const spectrum = new Spectrum('hex', '#FF0000');
 * spectrum.rgb // { r: 255, g: 0, b: 0, a: 1 }
 * spectrum.hsl // { h: 0, s: 1, l: 0.5, a: 1 }
 * spectrum.hex // "#ff0000"
 * spectrum.red // 255
 * spectrum.green // 0
 * spectrum.blue // 0
 * spectrum.alpha // 1
 */
export default class Spectrum {
  private _rgb: RgbObj;
  private _hsl: HslObj;
  private _hex: string;

  constructor(colorSpace: ColorSpace, value: InputValue) {
    switch (colorSpace) {
      case 'hex':
        this._rgb = hexToRgb(value);
        this._hsl = rgbObjToHsl(this._rgb);

        break;

      case 'hsl': {
        const hslObj = this.#hslValtoHsl(value);
        this._rgb = hslToRgb(hslObj);
        this._hsl = hslObj;
        break;
      }

      case 'rgb':
        this._rgb = this.#rgbValToRgb(value);
        this._hsl = rgbObjToHsl(this._rgb);
        break;

      default:
        throw new Error('Invalid color space value');
    }

    this._hex = rgbObjToHex(this._rgb);
  }

  /**
   * @returns {RgbObj} An RGB object
   */
  get rgb(): RgbObj {
    return Object.assign({}, this._rgb);
  }

  /**
   * @returns {HslObj} A HSL object
   */
  get hsl(): HslObj {
    return Object.assign({}, this._hsl);
  }

  /**
   * Returns `hex` value of the color
   */
  get hex(): string {
    return this._hex;
  }

  /**
   * Returns alpha channel value of the color
   */
  get alpha(): number {
    return this._rgb.a;
  }

  /**
   * Returns red channel value of the color
   */
  get red(): number {
    return this._rgb.r;
  }

  /**
   * Returns green channel value of the color
   */
  get green(): number {
    return this._rgb.g;
  }

  /**
   * Returns blue channel value of the color
   */
  get blue(): number {
    return this._rgb.b;
  }

  /**
   * Returns hue value of the color
   */
  get hue() {
    return this._hsl.h;
  }

  /**
   * Returns saturation value of the color
   */
  get saturation() {
    return this._hsl.s;
  }

  /**
   * Returns lightness value of the color
   */
  get lightness() {
    return this._hsl.l;
  }

  /**
   * Converts `rgb` input into RGB object value
   */
  #rgbValToRgb(colorValue: InputValue): RgbObj {
    if (!Array.isArray(colorValue) && typeof colorValue !== 'string') {
      throw new Error('RGB color value has to be a string or an Array');
    }

    const valuesArray = Array.isArray(colorValue)
      ? colorValue
      : colorValue.split(/,\s|\s/); // split by ', ' or ' '

    if (valuesArray.length !== 3 && valuesArray.length !== 4) {
      throw new Error(`Invalid RGB values array: ${colorValue}`);
    }

    const r = _validateValue('rgb', valuesArray[0]);
    const g = _validateValue('rgb', valuesArray[1]);
    const b = _validateValue('rgb', valuesArray[2]);
    const a = _validateValue('alpha', valuesArray[3]);

    return { r, g, b, a };
  }

  /**
   * Converts `hsl` input into RGB object value
   */
  #hslValtoHsl(colorValue: InputValue): HslObj {
    if (!Array.isArray(colorValue) && typeof colorValue !== 'string') {
      throw new Error('HSL color value has to be a string or an Array');
    }

    const valuesArray = Array.isArray(colorValue)
      ? colorValue
      : colorValue.split(/,\s|\s/); // split by ', ' or ' '

    if (valuesArray.length !== 3 && valuesArray.length !== 4) {
      throw new Error(`Invalid HSL values array: ${colorValue}`);
    }

    const h = _validateValue('hue', valuesArray[0]);
    const s = _validateValue('saturation', valuesArray[1]);
    const l = _validateValue('lightness', valuesArray[2]);
    const a = _validateValue('alpha', valuesArray[3]);

    return { h, s, l, a };
  }

  /**
   * Creates a new instance of the `Spectrum` class using an HSL object as an input.
   *
   * @param hslObj - An object representing the HSL color values
   * with properties `h` (hue), `s` (saturation), `l` (lightness), and `a` (alpha).
   * @returns A new instance of the `Spectrum` class.
   * @throws {Error} If any of the `h`, `s`, or `l` properties are `undefined`.
   *
   * @example
   * const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
   * const spectrum = Spectrum.fromHslObj(hslObj);
   * console.log(spectrum.hsl); // { h: 180, s: 0.5, l: 0.75, a: 1 }
   */
  static fromHslObj(hslObj: HslObj): Spectrum {
    const { h, s, l, a } = hslObj;

    if (
      typeof h === 'undefined' ||
      typeof s === 'undefined' ||
      typeof l === 'undefined'
    ) {
      throw new Error('Invalid HSL object');
    }

    return new Spectrum('hsl', [h, s, l, a]);
  }

  /**
   * Creates a new instance of the `Spectrum` class using an RGB object as an input.
   *
   * @param rgbObj - An object representing the RGB color values
   * with properties `r` (red), `g` (green), `b` (blue), and `a` (alpha).
   * @returns A new instance of the `Spectrum` class.
   * @throws {Error} If any of the `r`, `g`, or `b` properties are `undefined`.
   *
   * @example
   * const rgbObj = { r: 255, g: 130, b: 60, a: 0.8 };
   * const spectrum = Spectrum.fromRgbObj(rgbObj);
   * console.log(spectrum.rgb); // { r: 255, g: 130, b: 60, a: 0.8 }
   */
  static fromRgbObj(rgbObj: RgbObj): Spectrum {
    const { r, g, b, a } = rgbObj;

    if (
      typeof r === 'undefined' ||
      typeof g === 'undefined' ||
      typeof b === 'undefined'
    ) {
      throw new Error('Invalid RGB object');
    }

    return new Spectrum('rgb', [r, g, b, a]);
  }
}
