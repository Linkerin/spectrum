import adjustHwb, { ADJUST_HWB_WARNING, type HwbOptions } from './adjustHwb';
import Spectrum from '../spectrum';

describe('adjustHwb', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should adjust hue, blackness, whiteness and alpha values of a color object', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      hue: 30,
      whiteness: '40%',
      blackness: '-20%',
      alpha: -0.2
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 210, w: 0.6, b: 0.1, a: 0.8 });
  });

  it('should adjust hue, blackness, whiteness values of a color object', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      hue: -60,
      whiteness: '25%',
      blackness: '10%'
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 120, w: 0.45, b: 0.4, a: 1 });
  });

  it('should adjust only hue value of a color object', () => {
    const colorObj = new Spectrum('hwb', [143, 0.25, 0.73, 1]);
    const options: HwbOptions = {
      hue: 90
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 233, w: 0.25, b: 0.73, a: 1 });
  });

  it('should not modify original Spectrum instance', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 0.5]);
    const options: HwbOptions = {
      hue: -20,
      whiteness: '-10%',
      blackness: '+12%',
      alpha: -0.1
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).not.toEqual(colorObj.hwb);
    expect(adjustedColorObj.hwb).toEqual({ h: 160, w: 0.3, b: 0.62, a: 0.4 });
  });

  it('should adjust whiteness and alpha values of a color object', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.5, 0.5]);
    const options: HwbOptions = {
      whiteness: '-60%',
      alpha: 0.85
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 0, b: 0.5, a: 1 });
  });

  it('should adjust blackness and alpha values of a color object', () => {
    const colorObj = new Spectrum('hwb', [180, 0.3, 0.5, 0.67]);
    const options: HwbOptions = {
      blackness: '-13%',
      alpha: -0.1
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 0.3, b: 0.37, a: 0.57 });
  });

  it('should not adjust any values of a color object when no options are provided', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {};

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 0.2, b: 0.3, a: 1 });
  });

  it('should set blackness value to 0', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      blackness: '-100%'
    };

    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 0.2, b: 0, a: 1 });
  });

  it('should set whiteness value to 1', () => {
    const colorObj = new Spectrum('hwb', [180, 0.3, 0, 1]);
    const options: HwbOptions = {
      whiteness: '+100%'
    };

    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(spy).toHaveBeenCalledWith(ADJUST_HWB_WARNING);
    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 1, b: 0, a: 1 });
  });

  it('should handle blackness overflow', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      blackness: '+100%'
    };

    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(spy).toHaveBeenCalledWith(ADJUST_HWB_WARNING);
    expect(adjustedColorObj.hwb).toEqual({ h: 180, w: 0.17, b: 0.83, a: 1 });
  });

  it('should handle blackness and whiteness sum exceed', () => {
    const colorObj = new Spectrum('hwb', [180, 0.4, 0.4, 1]);
    const options: HwbOptions = {
      hue: -30,
      whiteness: '+15%',
      blackness: '+10%'
    };

    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const adjustedColorObj = adjustHwb(colorObj, options);

    expect(spy).toHaveBeenCalledWith(ADJUST_HWB_WARNING);
    expect(adjustedColorObj.hwb).toEqual({ h: 150, w: 0.52, b: 0.48, a: 1 });
  });

  it('should throw a TypeError if the colorObj is not an instance of the Spectrum class', () => {
    const colorObj = { hwb: { h: 180, w: 0.5, b: 0.5, a: 1 } };
    const options: HwbOptions = {
      hue: 30,
      whiteness: '50%',
      blackness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHwb(colorObj, options);
    }).toThrow(TypeError);
  });

  it('should throw an error if hue value is not a number', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options = {
      hue: '30',
      whiteness: '50%',
      blackness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHwb(colorObj, options);
    }).toThrow(`Invalid value: '30'. Hue value has to be a number`);
  });

  it('should throw an error if whiteness value is not a string', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options = {
      hue: 30,
      whiteness: 50,
      blackness: '-20%',
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHwb(colorObj, options);
    }).toThrow(`Invalid value: '50'. Whiteness value has to be a string`);
  });

  it('should throw an error if blackness value is not a string', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options = {
      hue: 30,
      whiteness: '50%',
      blackness: 0.2,
      alpha: -0.2
    };

    expect(() => {
      // @ts-expect-error
      adjustHwb(colorObj, options);
    }).toThrowError(`Invalid value: '0.2'. Blackness value has to be a string`);
  });

  // Throws an error if alpha value is not a number.
  it('should throw an error if alpha value is not a number', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options = {
      hue: 30,
      whiteness: '50%',
      blackness: '-20%',
      alpha: 'invalid'
    };

    // @ts-expect-error
    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: 'invalid'. Alpha value has to be a number`
    );
  });

  it('should throw an error when whiteness value is greater than 100%', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      whiteness: '150%'
    };

    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: '150%'. Whiteness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when hue value is greater than 360', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      hue: 400
    };

    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: '400'. Hue has to be a number in range [-360; 360]`
    );
  });

  it('should throw an error when blackness value is greater than 100%', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      blackness: '150%'
    };

    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: '150%'. Blackness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when alpha value is greater than 1 or less than -1', () => {
    const colorObj = new Spectrum('hwb', [180, 0.2, 0.3, 1]);
    const options: HwbOptions = {
      alpha: -2
    };

    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: '-2'. Alpha has to be a number in range [-1; 1]`
    );

    options.alpha = 2;
    expect(() => adjustHwb(colorObj, options)).toThrowError(
      `Invalid value: '2'. Alpha has to be a number in range [-1; 1]`
    );
  });
});
