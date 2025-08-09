import type {
  ColorSpace,
  CssNamedColor,
  HslObj,
  HwbObj,
  InputValue,
  RgbObj
} from './spectrum.types';
import { CSS_NAMED_COLORS } from './lib/constants';
import hexToRgb from './methods/hexToRgb';
import hslToHwb from './methods/hslToHwb';
import hslToRgb from './methods/hslToRgb';
import hwbToHsl from './methods/hwbToHsl';
import rgbObjToHex from './methods/rgbObjToHex';
import rgbObjToHsl from './methods/rgbObjToHsl';
import _validateValue from './utils/_validateValue';
import _multiplyFloat from './utils/_multiplyFloat';

export const HWB_CONSTRUCTOR_WARNING =
  'Spectrum: for hwb colors space provided whiteness + blackness ≥ 100%, resulting color will be gray and normalized.';

/**
 * Represents a color in different color spaces (hex, hsl, rgb).
 * Spectrum instances can be used with various methods
 * to convert between color spaces and access individual color channels.
 *
 * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/ | Spectrum API | Spectrum}
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
  private _hwb: HwbObj;

  constructor(colorSpace: ColorSpace | CssNamedColor, value?: InputValue) {
    if (!colorSpace) {
      throw new Error(
        'To create a Spectrum instance, you need to provide at least one parameter'
      );
    }

    if (!value) {
      const colorName = colorSpace.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(CSS_NAMED_COLORS, colorName)) {
        throw new Error(`Invalid CSS named color value: \`${colorSpace}\``);
      }

      this._rgb = hexToRgb(CSS_NAMED_COLORS[colorName as CssNamedColor]);
      this._hsl = rgbObjToHsl(this._rgb);
      this._hex = rgbObjToHex(this._rgb);
      this._hwb = hslToHwb(this._hsl);

      return;
    }

    switch (colorSpace) {
      case 'hex':
        this._rgb = hexToRgb(value);
        this._hsl = rgbObjToHsl(this._rgb);
        this._hwb = hslToHwb(this._hsl);
        break;

      case 'hsl': {
        const hslObj = this.#hslValtoHsl(value);
        this._rgb = hslToRgb(hslObj);
        this._hsl = hslObj;
        this._hwb = hslToHwb(this._hsl);
        break;
      }

      case 'rgb':
        this._rgb = this.#rgbValToRgb(value);
        this._hsl = rgbObjToHsl(this._rgb);
        this._hwb = hslToHwb(this._hsl);
        break;

      case 'hwb': {
        this._hwb = this.#hwbValtoHwb(value);
        this._hsl = hwbToHsl(this._hwb);
        this._rgb = hslToRgb(this._hsl);
        break;
      }

      default:
        throw new Error('Invalid color space value');
    }

    this._hex = rgbObjToHex(this._rgb);
  }

  /**
   * Retrieves the RGB object of the instance
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#rgb | Spectrum API | Spectrum - rgb}
   *
   * @returns {RgbObj} An RGB object
   */
  get rgb(): RgbObj {
    return Object.assign({}, this._rgb);
  }

  /**
   * Retrieves the HSL object of the instance
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#hsl | Spectrum API | Spectrum - hsl}
   *
   * @returns {HslObj} A HSL object
   */
  get hsl(): HslObj {
    return Object.assign({}, this._hsl);
  }

  /**
   * Retrieves the HWB object of the instance
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#hwb | Spectrum API | Spectrum - hwb}
   */
  get hwb(): HwbObj {
    return Object.assign({}, this._hwb);
  }

  /**
   * Returns the `hex` value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#hex | Spectrum API | Spectrum - hex}
   */
  get hex(): string {
    return this._hex;
  }

  /**
   * Returns the alpha channel value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#alpha | Spectrum API | Spectrum - alpha}
   */
  get alpha(): number {
    return this._rgb.a;
  }

  /**
   * Returns the red channel value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#red | Spectrum API | Spectrum - red}
   */
  get red(): number {
    return this._rgb.r;
  }

  /**
   * Returns the green channel value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#green | Spectrum API | Spectrum - green}
   */
  get green(): number {
    return this._rgb.g;
  }

  /**
   * Returns the blue channel value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#blue | Spectrum API | Spectrum - blue}
   */
  get blue(): number {
    return this._rgb.b;
  }

  /**
   * Returns the hue value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#hue | Spectrum API | Spectrum - hue}
   */
  get hue(): number {
    return this._hsl.h;
  }

  /**
   * Returns the saturation value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#saturation | Spectrum API | Spectrum - saturation}
   */
  get saturation(): number {
    return this._hsl.s;
  }

  /**
   * Returns the lightness value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#lightness | Spectrum API | Spectrum - lightness}
   */
  get lightness(): number {
    return this._hsl.l;
  }

  /**
   * Returns the whiteness value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#whiteness | Spectrum API | Spectrum - whiteness}
   */
  get whiteness(): number {
    return this._hwb.w;
  }

  /**
   * Returns the blackness value of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#blackness | Spectrum API | Spectrum - blackness}
   */
  get blackness(): number {
    return this._hwb.b;
  }

  /**
   * CSS `hsl()` string representation of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#tohslstring | Spectrum API | Spectrum - toHslString()}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl | MDN | hsl}
   * @example
   * const spectrum = new Spectrum('hsl', [180, 0.5, 0.85, 0.4]);
   * spectrum.toHslString(); // hsl(180 50% 85% / 0.4)
   */
  toHslString(): string {
    return `hsl(${this.hue} ${this.saturation * 100}% ${
      this.lightness * 100
    }% / ${this.alpha})`;
  }

  /**
   * CSS `hwb()` string representation of the color
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#tohslstring | Spectrum API | Spectrum - toHslString()}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb | MDN | hwb}
   * @example
   * const spectrum = new Spectrum('hwb', [180, 0.25, 0.35, 0.5]);
   * spectrum.toHwbString(); // hwb(180 25% 35% / 0.5)
   */
  toHwbString(): string {
    return `hwb(${this.hue} ${this.whiteness * 100}% ${
      this.blackness * 100
    }% / ${this.alpha})`;
  }

  /**
   * CSS `rgb()` string representation of the
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#torgbstring | Spectrum API | Spectrum - toRgbString()}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb | MDN | rgb}
   * @example
   * const spectrum = new Spectrum('rgb', [255, 130, 60, 0.8]);
   * spectrum.toRgbString(); // rgb(255 130 60 / 0.8)
   */
  toRgbString(): string {
    return `rgb(${this.red} ${this.green} ${this.blue} / ${this.alpha})`;
  }

  /** Converts `rgb` input into RGB object value */
  #rgbValToRgb(colorValue: InputValue): RgbObj {
    if (!Array.isArray(colorValue) && typeof colorValue !== 'string') {
      throw new Error('RGB color value has to be a string or an Array');
    }

    const valuesArray = Array.isArray(colorValue)
      ? colorValue
      : colorValue.split(/,\s?|\s/); // split by ', ' or ' '

    if (valuesArray.length !== 3 && valuesArray.length !== 4) {
      throw new Error(`Invalid RGB values array: ${colorValue}`);
    }

    const r = _validateValue('rgb', valuesArray[0]);
    const g = _validateValue('rgb', valuesArray[1]);
    const b = _validateValue('rgb', valuesArray[2]);
    const a = _validateValue('alpha', valuesArray[3]);

    return { r, g, b, a };
  }

  /** Converts `hsl` input into RGB object value */
  #hslValtoHsl(colorValue: InputValue): HslObj {
    if (!Array.isArray(colorValue) && typeof colorValue !== 'string') {
      throw new Error('HSL color value has to be a string or an Array');
    }

    const valuesArray = Array.isArray(colorValue)
      ? colorValue
      : colorValue.split(/,\s?|\s/); // split by ', ' or ' '

    if (valuesArray.length !== 3 && valuesArray.length !== 4) {
      throw new Error(`Invalid HSL values array: ${colorValue}`);
    }

    const h = _validateValue('hue', valuesArray[0]);
    const s = _validateValue('saturation', valuesArray[1]);
    const l = _validateValue('lightness', valuesArray[2]);
    const a = _validateValue('alpha', valuesArray[3]);

    return { h, s, l, a };
  }

  /** Converts `hsl` input into RGB object value */
  #hwbValtoHwb(colorValue: InputValue): HwbObj {
    if (!Array.isArray(colorValue) && typeof colorValue !== 'string') {
      throw new Error('HWB color value has to be a string or an Array');
    }

    const valuesArray = Array.isArray(colorValue)
      ? colorValue
      : colorValue.split(/,\s?|\s/); // split by ', ' or ' '

    if (valuesArray.length !== 3 && valuesArray.length !== 4) {
      throw new Error(`Invalid HWB values array: ${colorValue}`);
    }

    const h = _validateValue('hue', valuesArray[0]);
    let w = _validateValue('whiteness', valuesArray[1]);
    let b = _validateValue('blackness', valuesArray[2]);
    const a = _validateValue('alpha', valuesArray[3]);

    const sum = w + b;
    if (sum >= 1) {
      console.warn(HWB_CONSTRUCTOR_WARNING);

      const ratio = 1 / sum;
      w = _multiplyFloat(w, ratio);
      b = _multiplyFloat(b, ratio);
    }

    return { h, w, b, a };
  }

  /**
   * Creates a new instance of the `Spectrum` class using an HSL object as an input.
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#fromhslobj/ | Spectrum API | Spectrum - fromHslObj()}
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
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#fromrgbobj/ | Spectrum API | Spectrum - fromRgbObj()}
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

  /**
   * Creates a new instance of the `Spectrum` class using an HWB object as an input.
   * @see {@link https://spectrum.snipshot.dev/docs/spectrum-class/#fromhwbobj/ | Spectrum API | Spectrum - fromHwbObj()}
   *
   * @param hwbObj- An object representing the HWB color values
   * with properties `h` (hue), `w` (whiteness), `b` (blackness), and `a` (alpha).
   * @returns A new instance of the `Spectrum` class.
   * @throws {Error} If any of the `h`, `w`, or `b` properties are `undefined`.
   * @example
   * const hwbObj = { h: 180, w: 0.5, b: 0.3, a: 1 };
   * const spectrum = Spectrum.fromHwbObj(hwbObj);
   * console.log(spectrum.hwb); // { h: 180, w: 0.5, b: 0.3, a: 1 }
   */
  static fromHwbObj(hwbObj: HwbObj): Spectrum {
    const { h, w, b, a } = hwbObj;

    if (
      typeof h === 'undefined' ||
      typeof w === 'undefined' ||
      typeof b === 'undefined'
    ) {
      throw new Error('Invalid HWB object');
    }

    return new Spectrum('hwb', [h, w, b, a]);
  }
}
