import adjustHsl from './adjustHsl';
import Spectrum from '../spectrum';

describe('adjustHsl', () => {
  it('should adjust hue, saturation, lightness and alpha values of a color object', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: 30,
      saturation: '40%',
      lightness: '-20%',
      alpha: -0.2
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 210, s: 0.9, l: 0.3, a: 0.8 });
  });

  it('should adjust hue, saturation, lightness values of a color object', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: -60,
      saturation: '25%',
      lightness: '10%'
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 120, s: 0.75, l: 0.6, a: 1 });
  });

  it('should adjust only hue value of a color object', () => {
    const colorObj = new Spectrum('hsl', [143, 0.31, 0.73, 1]);
    const options = {
      hue: 90
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 233, s: 0.31, l: 0.73, a: 1 });
  });

  it('should not modify original Spectrum instance', () => {
    const colorObj = new Spectrum('hsl', [180, 0.4, 0.5, 0.5]);
    const options = {
      hue: -20,
      saturation: '-10%',
      lightness: '+12%',
      alpha: -0.1
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).not.toEqual(colorObj.hsl);
    expect(adjustedColorObj.hsl).toEqual({ h: 160, s: 0.3, l: 0.62, a: 0.4 });
  });

  it('should adjust saturation and alpha values of a color object', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 0.5]);
    const options = {
      saturation: '-60%',
      alpha: 0.85
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 180, s: 0, l: 0.5, a: 1 });
  });

  it('should adjust lightness and alpha values of a color object', () => {
    const colorObj = new Spectrum('hsl', [180, 0.3, 0.5, 0.67]);
    const options = {
      lightness: '-13%',
      alpha: -0.1
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 180, s: 0.3, l: 0.37, a: 0.57 });
  });

  it('should not adjust any values of a color object when no options are provided', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {};

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 180, s: 0.5, l: 0.5, a: 1 });
  });

  it('should set lightness value to 0', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      lightness: '-100%'
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 180, s: 0.5, l: 0, a: 1 });
  });

  it('should set lightness value to 1', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      lightness: '+100%'
    };

    const adjustedColorObj = adjustHsl(colorObj, options);

    expect(adjustedColorObj.hsl).toEqual({ h: 180, s: 0.5, l: 1, a: 1 });
  });

  it('should throw a TypeError if the colorObj is not an instance of the Spectrum class', () => {
    const colorObj = { hsl: { h: 180, s: 0.5, l: 0.5, a: 1 } };
    const options = {
      hue: 30,
      saturation: '50%',
      lightness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHsl(colorObj, options);
    }).toThrow(TypeError);
  });

  it('should throw an error if hue value is not a number', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: '30',
      saturation: '50%',
      lightness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHsl(colorObj, options);
    }).toThrow(`Invalid value: '30'. Hue value has to be a number`);
  });

  it('should throw an error if saturation value is not a string', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: 30,
      saturation: 50,
      lightness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHsl(colorObj, options);
    }).toThrow(`Invalid value: '50'. Saturation value has to be a string`);
  });

  it('should throw an error if lightness value is not a string', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: 30,
      saturation: '50%',
      lightness: 0.2,
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHsl(colorObj, options);
    }).toThrowError(`Invalid value: '0.2'. Lightness value has to be a string`);
  });

  // Throws an error if alpha value is not a number.
  it('should throw an error if alpha value is not a number', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: 30,
      saturation: '50%',
      lightness: '-20%',
      alpha: 'invalid'
    };

    // @ts-expect-error
    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: 'invalid'. Alpha value has to be a number`
    );
  });

  it('should throw an error when saturation value is greater than 100%', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      saturation: '150%'
    };

    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: '150%'. Saturation value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when hue value is greater than 360', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      hue: 400
    };

    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: '400'. Hue has to be a number in range [-360; 360]`
    );
  });

  it('should throw an error when lightness value is greater than 100%', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      lightness: '150%'
    };

    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: '150%'. Lightness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when alpha value is greater than 1 or less than -1', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const options = {
      alpha: -2
    };

    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: '-2'. Alpha has to be a number in range [-1; 1]`
    );

    options.alpha = 2;
    expect(() => adjustHsl(colorObj, options)).toThrowError(
      `Invalid value: '2'. Alpha has to be a number in range [-1; 1]`
    );
  });
});
