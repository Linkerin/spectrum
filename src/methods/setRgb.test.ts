import setRgb from './setRgb';
import Spectrum from '../spectrum';

describe('setRgb', () => {
  it('should modify the RGB values of a color object with valid input', () => {
    const color = new Spectrum('rgb', [100, 150, 200, 0.5]);
    const updatedColor = setRgb(color, { red: 255, green: 0, blue: 0 });
    expect(updatedColor.rgb).toEqual({ r: 255, g: 0, b: 0, a: 0.5 });
  });

  it('should not modify the initial Spectrum instance', () => {
    const color = new Spectrum('rgb', [233, 65, 137, 0.81]);
    const updatedColor = setRgb(color, {
      red: 134,
      green: 238,
      blue: 9,
      alpha: 0.21
    });
    expect(updatedColor.rgb).not.toEqual(color.rgb);
    expect(updatedColor.rgb).toEqual({ r: 134, g: 238, b: 9, a: 0.21 });
  });

  it('should throw a TypeError if the colorObj parameter is not an instance of the Spectrum class', () => {
    const color = { rgb: { r: 100, g: 150, b: 200, a: 0.5 } };
    expect(() => {
      // @ts-expect-error
      setRgb(color, { red: 255, green: 0, blue: 0 });
    }).toThrow(TypeError);
  });

  it('should throw an error for invalid red value', () => {
    const color = new Spectrum('rgb', [100, 150, 200, 0.5]);
    expect(() => {
      setRgb(color, { red: -1 });
    }).toThrow(`Invalid RGB value: -1`);
  });

  it('should throw an error for invalid green value', () => {
    const color = new Spectrum('rgb', [100, 150, 200, 0.5]);
    expect(() => {
      setRgb(color, { green: 256 });
    }).toThrow(`Invalid RGB value: 256`);
  });

  it('should throw an error for invalid blue value', () => {
    const color = new Spectrum('rgb', [100, 150, 200, 0.5]);
    expect(() => {
      setRgb(color, { blue: -10 });
    }).toThrow(`Invalid RGB value: -10`);
  });

  it('should throw an error for invalid alpha value', () => {
    const color = new Spectrum('rgb', [100, 150, 200, 0.5]);
    expect(() =>
      setRgb(color, {
        red: 255,
        green: 0,
        blue: 0,
        alpha: -0.5
      })
    ).toThrow(`Invalid alpha channel value: -0.5`);
  });
});
