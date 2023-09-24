import hslToRgb from './hslToRgb';

describe('hslToRgb', () => {
  it('should convert a valid HSL color object to a valid RGB color object', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.5, a: 1 };
    const expectedRgbObj = { r: 64, g: 191, b: 191, a: 1 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should convert a HSL color object with 0 values to a valid RGB color object', () => {
    const hslObj = { h: 0, s: 0, l: 0, a: 0 };
    const expectedRgbObj = { r: 0, g: 0, b: 0, a: 0 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should convert a valid HSL color object with alpha channel to a valid RGB color object', () => {
    const hslObj = { h: 222, s: 0.67, l: 0.4, a: 0.34 };
    const expectedRgbObj = { r: 34, g: 75, b: 170, a: 0.34 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should convert a HSL color object with maximum values to a valid RGB color object', () => {
    const hslObj = { h: 360, s: 1, l: 1, a: 1 };
    const expectedRgbObj = { r: 255, g: 255, b: 255, a: 1 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should convert a HSL color object with lightness value set to 0 to a valid RGB color object with r, g, and b values set to 0', () => {
    const hslObj = { h: 180, s: 0.5, l: 0, a: 1 };
    const expectedRgbObj = { r: 0, g: 0, b: 0, a: 1 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should convert a HSL color object with saturation value set to 0 to a valid RGB color object with r, g, and b values set to lightness value', () => {
    const hslObj = { h: 180, s: 0, l: 0.5, a: 1 };
    const expectedRgbObj = { r: 128, g: 128, b: 128, a: 1 };

    const result = hslToRgb(hslObj);

    expect(result).toEqual(expectedRgbObj);
  });

  it('should throw an error when hue value is less than 0', () => {
    const hslObj = { h: -10, s: 0.5, l: 0.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid hue value: -10)');
  });

  it('should throw an error when hue value is greater than 360', () => {
    const hslObj = { h: 400, s: 0.5, l: 0.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid hue value: 400)');
  });

  it('should throw an error when saturation value is less than 0', () => {
    const hslObj = { h: 180, s: -0.5, l: 0.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid saturation value: -0.5');
  });

  it('should throw an error when saturation value is greater than 1', () => {
    const hslObj = { h: 180, s: 1.5, l: 0.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid saturation value: 1.5');
  });

  it('should throw an error when lightness value is less than 0', () => {
    const hslObj = { h: 180, s: 0.5, l: -0.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid lightness value: -0.5');
  });

  it('should throw an error when lightness value is greater than 1', () => {
    const hslObj = { h: 180, s: 0.5, l: 1.5, a: 1 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid lightness value: 1.5');
  });

  it('should throw an error when alpha value is less than 0', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.5, a: -0.5 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid alpha channel value: -0.5)');
  });

  it('should throw an error when alpha value is greater than 1', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.5, a: 1.5 };

    expect(() => {
      hslToRgb(hslObj);
    }).toThrowError('Invalid alpha channel value: 1.5)');
  });
});
