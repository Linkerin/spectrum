import setHwb, { SET_HWB_WARNING } from './setHwb';
import Spectrum from '../spectrum';

describe('setHwb', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should update the hue value', () => {
    const colorObj = new Spectrum('hwb', [180, 0.3, 0.2, 1]);
    const updatedColorObj = setHwb(colorObj, { hue: 200 });
    expect(updatedColorObj.hwb).toEqual({ h: 200, w: 0.3, b: 0.2, a: 1 });
  });

  it('should update whiteness value', () => {
    const colorObj = new Spectrum('hwb', [180, 0.25, 0.1, 1]);
    const updatedColorObj = setHwb(colorObj, { whiteness: 0.8 });
    expect(updatedColorObj.hwb).toEqual({ h: 180, w: 0.8, b: 0.1, a: 1 });
  });

  it('should update blackness value', () => {
    const colorObj = new Spectrum('hwb', [180, 0.25, 0.1, 1]);
    const updatedColorObj = setHwb(colorObj, { blackness: 0.6 });
    expect(updatedColorObj.hwb).toEqual({ h: 180, w: 0.25, b: 0.6, a: 1 });
  });

  it('should alert on blackness and whiteness sum exceed', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.1, 1]);
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const updatedColorObj = setHwb(colorObj, { blackness: 0.7 });

    expect(spy).toHaveBeenCalledWith(SET_HWB_WARNING);
    expect(updatedColorObj.hwb).toEqual({ h: 180, w: 0.36, b: 0.64, a: 1 });
  });

  it('should alert on blackness and whiteness sum exceed when setting both values', () => {
    const colorObj = new Spectrum('hwb', [180, 0.1, 0.1, 1]);
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const updatedColorObj = setHwb(colorObj, {
      whiteness: 0.95,
      blackness: 0.7
    });

    expect(spy).toHaveBeenCalledWith(SET_HWB_WARNING);
    expect(updatedColorObj.hwb).toEqual({ h: 180, w: 0.58, b: 0.42, a: 1 });
  });

  it('should handle empty options object', () => {
    const colorObj = new Spectrum('hwb', [230, 0.25, 0.1, 0.34]);
    const updatedColorObj = setHwb(colorObj, {});
    expect(updatedColorObj.hwb).toEqual({ h: 230, w: 0.25, b: 0.1, a: 0.34 });
  });

  it('should handle all undefined options', () => {
    const colorObj = new Spectrum('hwb', [230, 0.25, 0.1, 0.34]);
    const updatedColorObj = setHwb(colorObj, {
      hue: undefined,
      whiteness: undefined,
      blackness: undefined,
      alpha: undefined
    });
    expect(updatedColorObj.hwb).toEqual({ h: 230, w: 0.25, b: 0.1, a: 0.34 });
  });

  it('should update alpha value when alpha is defined', () => {
    const colorObj = new Spectrum('hwb', [98, 0.67, 0.21, 0.93]);
    const updatedColorObj = setHwb(colorObj, { alpha: 0.5 });
    expect(updatedColorObj.hwb).toEqual({ h: 98, w: 0.67, b: 0.21, a: 0.5 });
  });

  it('should not modify the original Spectrum object when updating HWB values and accept percentage values', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 1]);
    const updatedColorObj = setHwb(colorObj, {
      hue: 200,
      whiteness: '60%',
      blackness: '21%',
      alpha: '79%'
    });
    expect(updatedColorObj.hwb).not.toEqual(colorObj.hwb);
    expect(updatedColorObj.hwb).toEqual({ h: 200, w: 0.6, b: 0.21, a: 0.79 });
  });

  it('should throw TypeError if colorObj is not an instance of Spectrum class', () => {
    const colorObj = { hwb: { h: 180, w: 50, b: 50, a: 1 } };
    expect(() => {
      // @ts-expect-error
      setHwb(colorObj, { hue: 200 });
    }).toThrow(TypeError);
  });

  it('should throw Error if hue value is not in range [0; 360]', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 1]);
    expect(() => {
      setHwb(colorObj, { hue: 400 });
    }).toThrowError('Invalid hue value: 400)');

    expect(() => {
      setHwb(colorObj, { hue: -50 });
    }).toThrowError('Invalid hue value: -50)');
  });

  it('should throw Error if whiteness value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 1]);
    expect(() => setHwb(colorObj, { whiteness: -0.5 })).toThrowError(
      'Invalid whiteness value: -0.5'
    );
    expect(() => setHwb(colorObj, { whiteness: 1.5 })).toThrowError(
      'Invalid whiteness value: 1.5'
    );
    expect(() => setHwb(colorObj, { whiteness: '120%' })).toThrowError(
      'Invalid whiteness value: 120%'
    );
    expect(() => setHwb(colorObj, { whiteness: 'abc' })).toThrowError(
      'Invalid whiteness value: abc'
    );
  });

  it('should throw Error if blackness value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 1]);
    expect(() => {
      setHwb(colorObj, { blackness: 1.5 });
    }).toThrowError('Invalid blackness value: 1.5');

    expect(() => {
      setHwb(colorObj, { blackness: -0.5 });
    }).toThrowError('Invalid blackness value: -0.5');

    expect(() => {
      setHwb(colorObj, { blackness: '120%' });
    }).toThrowError('Invalid blackness value: 120%');

    expect(() => {
      setHwb(colorObj, { blackness: '-20%' });
    }).toThrowError('Invalid blackness value: -20%');
  });

  it('should throw Error if alpha value is not in range [0, 1] or not a percentage string', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 1]);
    expect(() => setHwb(colorObj, { alpha: -0.5 })).toThrowError(
      'Invalid alpha channel value: -0.5)'
    );
    expect(() => setHwb(colorObj, { alpha: 1.5 })).toThrowError(
      'Invalid alpha channel value: 1.5)'
    );
    expect(() => setHwb(colorObj, { alpha: '200%' })).toThrowError(
      'Invalid alpha channel value: 200%)'
    );
    expect(() => setHwb(colorObj, { alpha: '50' })).toThrowError(
      'Invalid alpha channel value: 50)'
    );
  });
});
