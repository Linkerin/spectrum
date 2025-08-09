import hwbToHsl from './hwbToHsl';
import type { HslObj, HwbObj } from '../spectrum.types';

describe('hwbToHsl', () => {
  it('should convert a valid HWB color object to a valid HWB color object', () => {
    const hwbObj: HwbObj = { h: 180, w: 0.35, b: 0.28, a: 1 };
    const expectedHslObj: HslObj = { h: 180, s: 0.4, l: 0.53, a: 1 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a HWB color object with 0 values to a valid HSL color object', () => {
    const hwbObj: HwbObj = { h: 0, w: 0, b: 0, a: 0 };
    const expectedHslObj: HslObj = { h: 0, s: 1, l: 0.5, a: 0 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a valid HWB color object with alpha channel to a valid HSL color object', () => {
    const hwbObj: HwbObj = { h: 222, w: 0.14, b: 0.47, a: 0.34 };
    const expectedHslObj: HslObj = { h: 222, s: 0.58, l: 0.34, a: 0.34 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a HWB color object with maximum values to a valid HSL color object', () => {
    const hwbObj: HwbObj = { h: 360, w: 1, b: 1, a: 1 };
    const expectedHslObj: HslObj = { h: 360, s: 0, l: 0.5, a: 1 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a HWB color object with lightness and blackness sum equal to 100% to a valid HSL color object', () => {
    const hwbObj: HwbObj = { h: 360, w: 0.4, b: 0.6, a: 1 };
    const expectedHslObj: HslObj = { h: 360, s: 0, l: 0.4, a: 1 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a HWB color object with whiteness value set to 0 to a valid HSL color object for black', () => {
    const hwbObj: HwbObj = { h: 180, w: 0, b: 1, a: 1 };
    const expectedHslObj: HslObj = { h: 180, s: 0, l: 0, a: 1 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should convert a HWB color object with blackness value set to 0 to a valid HSL color object for white', () => {
    const hwbObj: HwbObj = { h: 180, w: 1, b: 0, a: 1 };
    const expectedHslObj: HslObj = { h: 180, s: 0, l: 1, a: 1 };

    const result = hwbToHsl(hwbObj);

    expect(result).toEqual(expectedHslObj);
  });

  it('should throw an error when hue value is not in range [0; 360]', () => {
    const hwbObjNegativeHue: HwbObj = { h: -10, w: 0.5, b: 0.5, a: 1 };
    const hwbObjGreaterThan360: HwbObj = { h: 400, w: 0.5, b: 0.5, a: 1 };

    expect(() => {
      hwbToHsl(hwbObjNegativeHue);
    }).toThrowError(`Invalid hue value: ${hwbObjNegativeHue.h})`);
    expect(() => {
      hwbToHsl(hwbObjGreaterThan360);
    }).toThrowError(`Invalid hue value: ${hwbObjGreaterThan360.h})`);
  });

  it('should throw an error when whiteness value is not in range [0; 1]', () => {
    const hwbObjNegativeW: HwbObj = { h: 180, w: -0.5, b: 0.4, a: 1 };
    const hwbObjGreaterThanOneW: HwbObj = { h: 180, w: 1.5, b: 0.4, a: 1 };

    expect(() => {
      hwbToHsl(hwbObjNegativeW);
    }).toThrowError(`Invalid whiteness value: ${hwbObjNegativeW.w}`);
    expect(() => {
      hwbToHsl(hwbObjGreaterThanOneW);
    }).toThrowError(`Invalid whiteness value: ${hwbObjGreaterThanOneW.w}`);
  });

  it('should throw an error when blackness value is not in range [0; 1]', () => {
    const hwbObjNegativeB: HwbObj = { h: 180, w: 0.5, b: -0.4, a: 1 };
    const hwbObjGreaterThanOneB: HwbObj = { h: 180, w: 0.4, b: 1.5, a: 1 };

    expect(() => {
      hwbToHsl(hwbObjNegativeB);
    }).toThrowError(`Invalid blackness value: ${hwbObjNegativeB.b}`);
    expect(() => {
      hwbToHsl(hwbObjGreaterThanOneB);
    }).toThrowError(`Invalid blackness value: ${hwbObjGreaterThanOneB.b}`);
  });

  it('should throw an error when alpha value is not in range [0; 1]', () => {
    const hwbObjNegativeAlpha: HwbObj = { h: 180, w: 0.5, b: 0.4, a: -0.5 };
    const hwbObjAlphaGreaterThanOne: HwbObj = {
      h: 180,
      w: 0.5,
      b: 0.4,
      a: 1.5
    };

    expect(() => {
      hwbToHsl(hwbObjNegativeAlpha);
    }).toThrowError(`Invalid alpha channel value: ${hwbObjNegativeAlpha.a})`);
    expect(() => {
      hwbToHsl(hwbObjAlphaGreaterThanOne);
    }).toThrowError(
      `Invalid alpha channel value: ${hwbObjAlphaGreaterThanOne.a})`
    );
  });
});
