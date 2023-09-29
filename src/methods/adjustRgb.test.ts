import adjustRgb from './adjustRgb';
import Spectrum from '../spectrum';

describe('adjustRgb', () => {
  it('should adjust the red value of a color object and return a new Spectrum instance with the updated RGB values', () => {
    const color = new Spectrum('rgb', [255, 0, 0, 1]);
    const adjustedColor = adjustRgb(color, { red: -50 });
    expect(adjustedColor.rgb).toEqual({ r: 205, g: 0, b: 0, a: 1 });
  });

  it('should adjust the green value of a color object and return a new Spectrum instance with the updated RGB values', () => {
    const color = new Spectrum('rgb', [137, 255, 0, 1]);
    const adjustedColor = adjustRgb(color, { green: -50 });
    expect(adjustedColor.rgb).toEqual({ r: 137, g: 205, b: 0, a: 1 });
  });

  it('should adjust the blue value of a color object and return a new Spectrum instance with the updated RGB values', () => {
    const color = new Spectrum('rgb', [147, 15, 255, 1]);
    const adjustedColor = adjustRgb(color, { blue: -50 });
    expect(adjustedColor.rgb).toEqual({ r: 147, g: 15, b: 205, a: 1 });
  });

  it('should adjust the alpha value of a color object and return a new Spectrum instance with the updated RGB values', () => {
    const color = new Spectrum('rgb', [255, 0, 0, 0.67]);
    const adjustedColor = adjustRgb(color, { alpha: -0.1 });
    expect(adjustedColor.rgb).toEqual({ r: 255, g: 0, b: 0, a: 0.57 });
  });

  it('should adjust multiple values and return a new Spectrum instance with the updated RGB values', () => {
    const color = new Spectrum('rgb', [136, 243, 24, 1]);
    const adjustedColor = adjustRgb(color, {
      red: 14,
      green: 250,
      blue: -21,
      alpha: -0.31
    });
    expect(adjustedColor.rgb).toEqual({ r: 150, g: 255, b: 3, a: 0.69 });
  });

  it('should not modify original Spectrum object', () => {
    const color = new Spectrum('rgb', [136, 243, 24, 1]);
    const adjustedColor = adjustRgb(color, {
      red: -16,
      green: -120,
      blue: +76,
      alpha: +0.2
    });
    expect(adjustedColor.rgb).not.toEqual(color.rgb);
    expect(adjustedColor.rgb).toEqual({ r: 120, g: 123, b: 100, a: 1 });
  });

  it('should not adjust any RGB values if no options are provided', () => {
    const color = new Spectrum('rgb', [31, 201, 25, 0.23]);
    const adjustedColor = adjustRgb(color, {});
    expect(adjustedColor.rgb).toEqual(color.rgb);
    expect(adjustedColor.hex).toEqual(color.hex);
    expect(adjustedColor.hsl).toEqual(color.hsl);
  });

  it('should set alpha to 1 if it overflows the maximum value', () => {
    const color3 = new Spectrum('rgb', [255, 0, 0, 1]);
    const adjustedColor3 = adjustRgb(color3, { alpha: 0.5 });
    expect(adjustedColor3.rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should return a new Spectrum instance with the same RGB values when all properties in the options object are undefined', () => {
    const color = new Spectrum('rgb', [255, 132, 14, 0.72]);
    const adjustedColor = adjustRgb(color, {
      red: undefined,
      green: undefined,
      blue: undefined,
      alpha: undefined
    });
    expect(adjustedColor.rgb).toEqual({ r: 255, g: 132, b: 14, a: 0.72 });
  });

  it('should throw a TypeError if the first argument is not an instance of the Spectrum class', () => {
    expect(() => {
      // @ts-expect-error
      adjustRgb({}, { red: -50 });
    }).toThrow(TypeError);
  });

  it('should throw an Error if the red value is not a number', () => {
    const color = new Spectrum('rgb', [255, 0, 0, 1]);
    expect(() => {
      // @ts-expect-error
      adjustRgb(color, { red: 'invalid' });
    }).toThrow(`Invalid value: 'invalid'. RGB value has to be a number`);
  });

  it('should throw an Error if the alpha value is not a number', () => {
    const color = new Spectrum('rgb', [255, 0, 0, 1]);
    expect(() => {
      // @ts-expect-error
      adjustRgb(color, { alpha: 'invalid' });
    }).toThrowError("Invalid value: 'invalid'. Alpha value has to be a number");
  });

  // Throws an Error if the blue value is not a number.
  it('should throw an Error if the blue value is not a number', () => {
    const color = new Spectrum('rgb', [255, 0, 0, 1]);
    expect(() => {
      // @ts-expect-error
      adjustRgb(color, { blue: 'invalid' });
    }).toThrowError("Invalid value: 'invalid'. RGB value has to be a number");
  });

  it('should throw an error if the value is greater than the maximum possible value', () => {
    const color = new Spectrum('rgb', [134, 137, 253, 0.5]);

    for (const channel of ['red', 'green', 'blue']) {
      expect(() => adjustRgb(color, { [channel]: 256 })).toThrowError(
        `Invalid value: '256'. RGB has to be a number in range [-255; 255]`
      );
    }

    expect(() => adjustRgb(color, { alpha: 2 })).toThrowError(
      `Invalid value: '2'. Alpha has to be a number in range [-1; 1]`
    );
  });

  it('should throw an error if the value is less than the minimum possible value', () => {
    const color = new Spectrum('rgb', [134, 137, 253, 0.5]);

    for (const channel of ['red', 'green', 'blue']) {
      expect(() => adjustRgb(color, { [channel]: -256 })).toThrowError(
        `Invalid value: '-256'. RGB has to be a number in range [-255; 255]`
      );
    }

    expect(() => adjustRgb(color, { alpha: -2 })).toThrowError(
      `Invalid value: '-2'. Alpha has to be a number in range [-1; 1]`
    );
  });
});
