import invert from './invert';
import Spectrum from '../spectrum';

describe('invert', () => {
  it('should invert the color with a weight of 0.5', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    const invertedColor = invert(colorObj, 0.5);
    expect(invertedColor.rgb).toEqual({ r: 128, g: 128, b: 128, a: 1 });
  });

  // Inverts a given Spectrum instance with a weight of 0
  it('should invert the color with a weight of 0', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    const invertedColor = invert(colorObj, 0);
    expect(invertedColor.rgb).toEqual({ r: 100, g: 150, b: 200, a: 1 });
  });

  it('should invert the color with a weight of 1', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    const invertedColor = invert(colorObj, 1);
    expect(invertedColor.rgb).toEqual({ r: 155, g: 105, b: 55, a: 1 });
  });

  it('should invert the color with all RGB values equal to 0 and weight is 0.5', () => {
    const colorObj = new Spectrum('rgb', [0, 0, 0]);
    const invertedColor = invert(colorObj, 0.5);
    expect(invertedColor.rgb).toEqual({ r: 128, g: 128, b: 128, a: 1 });
  });

  it('should invert the color with all RGB values equal to 0 and weight is 1', () => {
    const colorObj = new Spectrum('rgb', [0, 0, 0]);
    const invertedColor = invert(colorObj, 1);
    expect(invertedColor.rgb).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  });

  it('should invert the color with all RGB values equal to 255', () => {
    const colorObj = new Spectrum('rgb', [255, 255, 255]);
    const invertedColor = invert(colorObj, 1);
    expect(invertedColor.rgb).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });

  it('should invert the color with an alpha value of 0', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200, 0]);
    const invertedColor = invert(colorObj, 0.75);
    expect(invertedColor.rgb).toEqual({ r: 141, g: 116, b: 91, a: 0.75 });
  });

  it('should invert the color with an alpha value of 1', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200, 1]);
    const invertedColor = invert(colorObj, 1);
    expect(invertedColor.rgb).toEqual({ r: 155, g: 105, b: 55, a: 1 });
  });

  it('should change the initial Spectrum instance', () => {
    const colorObj = new Spectrum('rgb', [64, 231, 178]);
    const invertedColor = invert(colorObj, 1);
    expect(invertedColor.rgb).not.toEqual(colorObj.rgb);
    expect(invertedColor.rgb).toEqual({ r: 191, g: 24, b: 77, a: 1 });
  });

  it('should invert the color from hex value', () => {
    const colorObj = new Spectrum('hex', '#9ca1c9');
    const invertedColor = invert(colorObj, 0.83);
    expect(invertedColor.rgb).toEqual({ r: 109, g: 105, b: 79, a: 1 });
  });

  it('should throw an error when inverting with a negative weight', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    expect(() => invert(colorObj, -0.5)).toThrowError(
      'Invalid weight: -0.5. Weight value has to be a percent in range [0; 1]'
    );
  });

  it('should throw a TypeError if the colorObj is not an instance of Spectrum class', () => {
    const colorObj = { r: 100, g: 150, b: 200 };
    // @ts-expect-error
    expect(() => invert(colorObj, 0.5)).toThrow(TypeError);
  });

  it('should throw an Error if the weight is NaN', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    expect(() => invert(colorObj, NaN)).toThrow(
      `Invalid weight: the 'NaN' value provided`
    );
  });

  it('should throw an Error if the weight is less than 0', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    const weight = -0.5;
    expect(() => invert(colorObj, weight)).toThrow(
      `Invalid weight: ${weight}. Weight value has to be a percent in range [0; 1]`
    );
  });

  it('should throw an Error when the weight is greater than 1', () => {
    const colorObj = new Spectrum('rgb', [100, 150, 200]);
    const weight = -0.5;
    expect(() => invert(colorObj, weight)).toThrowError(
      `Invalid weight: ${weight}. Weight value has to be a percent in range [0; 1]`
    );
  });
});
