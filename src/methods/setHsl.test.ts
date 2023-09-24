import setHsl from './setHsl';
import Spectrum from '../spectrum';

describe('setHsl', () => {
  it('should update the hue value', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const updatedColorObj = setHsl(colorObj, { hue: 200 });
    expect(updatedColorObj.hsl).toEqual({ h: 200, s: 0.5, l: 0.5, a: 1 });
  });

  it('should update saturation value', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const updatedColorObj = setHsl(colorObj, { saturation: 0.8 });
    expect(updatedColorObj.hsl).toEqual({ h: 180, s: 0.8, l: 0.5, a: 1 });
  });

  it('should update lightness value', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const updatedColorObj = setHsl(colorObj, { lightness: 0.6 });
    expect(updatedColorObj.hsl).toEqual({ h: 180, s: 0.5, l: 0.6, a: 1 });
  });

  it('should handle empty options object', () => {
    const colorObj = new Spectrum('hsl', [230, 0.85, 1, 0.34]);
    const updatedColorObj = setHsl(colorObj, {});
    expect(updatedColorObj.hsl).toEqual({ h: 230, s: 0.85, l: 1, a: 0.34 });
  });

  it('should handle all undefined options', () => {
    const colorObj = new Spectrum('hsl', [230, 0.85, 1, 0.34]);
    const updatedColorObj = setHsl(colorObj, {
      hue: undefined,
      saturation: undefined,
      lightness: undefined,
      alpha: undefined
    });
    expect(updatedColorObj.hsl).toEqual({ h: 230, s: 0.85, l: 1, a: 0.34 });
  });

  it('should update alpha value when alpha is defined', () => {
    const colorObj = new Spectrum('hsl', [98, 1, 0.21, 0.93]);
    const updatedColorObj = setHsl(colorObj, { alpha: 0.5 });
    expect(updatedColorObj.hsl).toEqual({ h: 98, s: 1, l: 0.21, a: 0.5 });
  });

  it('should not modify the original Spectrum object when updating HSL values and accept percentage values', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    const updatedColorObj = setHsl(colorObj, {
      hue: 200,
      saturation: '60%',
      lightness: '73%',
      alpha: '79%'
    });
    expect(updatedColorObj.hsl).not.toEqual(colorObj.hsl);
    expect(updatedColorObj.hsl).toEqual({ h: 200, s: 0.6, l: 0.73, a: 0.79 });
  });

  it('should throw TypeError if colorObj is not an instance of Spectrum class', () => {
    const colorObj = { hsl: { h: 180, s: 50, l: 50, a: 1 } };
    expect(() => {
      // @ts-expect-error
      setHsl(colorObj, { hue: 200 });
    }).toThrow(TypeError);
  });

  it('should throw Error if hue value is not in range [0; 360]', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    expect(() => {
      setHsl(colorObj, { hue: 400 });
    }).toThrowError('Invalid hue value: 400)');

    expect(() => {
      setHsl(colorObj, { hue: -50 });
    }).toThrowError('Invalid hue value: -50)');
  });

  it('should throw Error if saturation value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    expect(() => setHsl(colorObj, { saturation: -0.5 })).toThrowError(
      'Invalid saturation value: -0.5'
    );
    expect(() => setHsl(colorObj, { saturation: 1.5 })).toThrowError(
      'Invalid saturation value: 1.5'
    );
    expect(() => setHsl(colorObj, { saturation: '120%' })).toThrowError(
      'Invalid saturation value: 120%'
    );
    expect(() => setHsl(colorObj, { saturation: 'abc' })).toThrowError(
      'Invalid saturation value: abc'
    );
  });

  it('should throw Error if lightness value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    expect(() => {
      setHsl(colorObj, { lightness: 1.5 });
    }).toThrowError('Invalid lightness value: 1.5');

    expect(() => {
      setHsl(colorObj, { lightness: -0.5 });
    }).toThrowError('Invalid lightness value: -0.5');

    expect(() => {
      setHsl(colorObj, { lightness: '120%' });
    }).toThrowError('Invalid lightness value: 120%');

    expect(() => {
      setHsl(colorObj, { lightness: '-20%' });
    }).toThrowError('Invalid lightness value: -20%');
  });

  it('should throw Error if alpha value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hsl', [180, 0.5, 0.5, 1]);
    expect(() => setHsl(colorObj, { alpha: -0.5 })).toThrowError(
      'Invalid alpha channel value: -0.5)'
    );
    expect(() => setHsl(colorObj, { alpha: 1.5 })).toThrowError(
      'Invalid alpha channel value: 1.5)'
    );
    expect(() => setHsl(colorObj, { alpha: '200%' })).toThrowError(
      'Invalid alpha channel value: 200%)'
    );
    expect(() => setHsl(colorObj, { alpha: '50' })).toThrowError(
      'Invalid alpha channel value: 50)'
    );
  });
});
