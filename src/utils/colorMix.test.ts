import colorMix from './colorMix';
import Spectrum from '../spectrum';

describe('colorMix', () => {
  it('should mix two colors with weight 0.5', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const mixedColor = colorMix(color1, color2, 0.5);
    expect(mixedColor.rgb).toEqual({ r: 128, g: 128, b: 0, a: 1 });
  });

  it('should mix two colors from hex values', () => {
    const color1 = new Spectrum('hex', '#9ca1c9');
    const color2 = new Spectrum('hex', '#ddb188');
    const mixedColor = colorMix(color1, color2, 0.34);
    expect(mixedColor.rgb).toEqual({ r: 199, g: 172, b: 158, a: 1 });
  });

  it('should mix two colors with weight 0', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const mixedColor = colorMix(color1, color2, 0);
    expect(mixedColor.rgb).toEqual({ r: 0, g: 255, b: 0, a: 1 });
  });

  it('should mix two colors with weight 1', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const mixedColor = colorMix(color1, color2, 1);
    expect(mixedColor.rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should not change original Spectrum instances', () => {
    const color1 = new Spectrum('rgb', [128, 65, 71, 1]);
    const color2 = new Spectrum('rgb', [65, 255, 134, 1]);
    const mixedColor = colorMix(color1, color2, 0.65);
    expect(color1.rgb).not.toEqual(mixedColor.rgb);
    expect(color2.rgb).not.toEqual(mixedColor.rgb);
    expect(mixedColor.rgb).toEqual({ r: 106, g: 132, b: 93, a: 1 });
  });

  it('should throw TypeError if color1 is not an instance of Spectrum class', () => {
    const color1 = 'rgb(255, 0, 0)';
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    // @ts-expect-error
    expect(() => colorMix(color1, color2, 0.5)).toThrow(TypeError);
  });

  it('should throw TypeError if color2 is not an instance of Spectrum class', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = 'rgb(0, 255, 0)';
    // @ts-expect-error
    expect(() => colorMix(color1, color2, 0.5)).toThrow(TypeError);
  });

  it('should throw Error if weight is less than 0', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const weight = -0.5;
    expect(() => colorMix(color1, color2, weight)).toThrow(
      `Invalid weight: ${weight}. Weight value has to be a percent in range [0; 1]`
    );
  });

  it('should throw an error if weight is greater than 1', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const weight = 1.1;

    expect(() => {
      colorMix(color1, color2, weight);
    }).toThrowError(
      `Invalid weight: ${weight}. Weight value has to be a percent in range [0; 1]`
    );
  });

  it('should mix two colors with alpha values', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 0.5]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 0.8]);
    const mixedColor = colorMix(color1, color2, 0.3);
    expect(mixedColor.rgb).toEqual({ r: 77, g: 179, b: 0, a: 0.71 });
  });

  it('should mix two colors with weight 0.01', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const mixedColor = colorMix(color1, color2, 0.01);
    expect(mixedColor.rgb).toEqual({ r: 3, g: 252, b: 0, a: 1 });
  });

  it('should mix two colors with weight 0.99', () => {
    const color1 = new Spectrum('rgb', [255, 0, 0, 1]);
    const color2 = new Spectrum('rgb', [0, 255, 0, 1]);
    const mixedColor = colorMix(color1, color2, 0.99);
    expect(mixedColor.rgb).toEqual({ r: 252, g: 3, b: 0, a: 1 });
  });
});
