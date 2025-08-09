import hslToHwb from './hslToHwb';
import type { HslObj, HwbObj } from '../spectrum.types';

describe('hslToHwb', () => {
  it('should convert a valid HSL color object to a valid HWB color object', () => {
    const hslObj: HslObj = { h: 180, s: 0.35, l: 0.75, a: 1 };
    const expectedHwbObj: HwbObj = { h: 180, w: 0.66, b: 0.16, a: 1 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should convert a HSL color object with 0 values to a valid HWB color object', () => {
    const hslObj: HslObj = { h: 0, s: 0, l: 0, a: 0 };
    const expectedHwbObj: HwbObj = { h: 0, w: 0, b: 1, a: 0 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should convert a valid HSL color object with alpha channel to a valid HWB color object', () => {
    const hslObj: HslObj = { h: 222, s: 0.67, l: 0.47, a: 0.34 };
    const expectedHwbObj: HwbObj = { h: 222, w: 0.16, b: 0.22, a: 0.34 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should convert a HSL color object with maximum values to a valid HWB color object', () => {
    const hslObj: HslObj = { h: 360, s: 1, l: 1, a: 1 };
    const expectedHwbObj: HwbObj = { h: 360, w: 1, b: 0, a: 1 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should convert a HSL color object with saturation value set to 0 to a valid HWB color object for black', () => {
    const hslObj: HslObj = { h: 180, s: 0, l: 1, a: 1 };
    const expectedHwbObj: HwbObj = { h: 180, w: 1, b: 0, a: 1 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should convert a HSL color object with lightness value set to 0 to a valid HWB color object for white', () => {
    const hslObj: HslObj = { h: 180, s: 1, l: 0, a: 1 };
    const expectedHwbObj: HwbObj = { h: 180, w: 0, b: 1, a: 1 };

    const result = hslToHwb(hslObj);

    expect(result).toEqual(expectedHwbObj);
  });

  it('should throw an error when hue value is not in range [0; 360]', () => {
    const hslObjNegativeHue: HslObj = { h: -10, s: 0.5, l: 0.5, a: 1 };
    const hslObjGreaterThan360: HslObj = { h: 400, s: 0.5, l: 0.5, a: 1 };

    expect(() => {
      hslToHwb(hslObjNegativeHue);
    }).toThrowError(`Invalid hue value: ${hslObjNegativeHue.h})`);
    expect(() => {
      hslToHwb(hslObjGreaterThan360);
    }).toThrowError(`Invalid hue value: ${hslObjGreaterThan360.h})`);
  });

  it('should throw an error when saturation value is not in range [0; 1]', () => {
    const hslObjNegativeS: HslObj = { h: 180, s: -0.5, l: 0.4, a: 1 };
    const hslObjGreaterThanOneS: HslObj = { h: 180, s: 1.5, l: 0.4, a: 1 };

    expect(() => {
      hslToHwb(hslObjNegativeS);
    }).toThrowError(`Invalid saturation value: ${hslObjNegativeS.s}`);
    expect(() => {
      hslToHwb(hslObjGreaterThanOneS);
    }).toThrowError(`Invalid saturation value: ${hslObjGreaterThanOneS.s}`);
  });

  it('should throw an error when lightness value is not in range [0; 1]', () => {
    const hslObjNegativeL: HslObj = { h: 180, s: 0.5, l: -0.4, a: 1 };
    const hslObjGreaterThanOneL: HslObj = { h: 180, s: 0.4, l: 1.5, a: 1 };

    expect(() => {
      hslToHwb(hslObjNegativeL);
    }).toThrowError(`Invalid lightness value: ${hslObjNegativeL.l}`);
    expect(() => {
      hslToHwb(hslObjGreaterThanOneL);
    }).toThrowError(`Invalid lightness value: ${hslObjGreaterThanOneL.l}`);
  });

  it('should throw an error when alpha value is not in range [0; 1]', () => {
    const hslObjNegativeAlpha: HslObj = { h: 180, s: 0.5, l: 0.4, a: -0.5 };
    const hslObjAlphaGreaterThanOne: HslObj = {
      h: 180,
      s: 0.5,
      l: 0.4,
      a: 1.5
    };

    expect(() => {
      hslToHwb(hslObjNegativeAlpha);
    }).toThrowError(`Invalid alpha channel value: ${hslObjNegativeAlpha.a})`);
    expect(() => {
      hslToHwb(hslObjAlphaGreaterThanOne);
    }).toThrowError(
      `Invalid alpha channel value: ${hslObjAlphaGreaterThanOne.a})`
    );
  });
});
