import rgbObjToHsl from './rgbObjToHsl';

describe('rgbObjToHsl', () => {
  it('should convert a valid RGB object to a valid HSL object', () => {
    const rgbObj = { r: 255, g: 0, b: 0, a: 1 };
    const expectedHslObj = { h: 0, s: 1, l: 0.5, a: 1 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should convert a valid RGB object to a valid HSL object, when RGB values are in range [0, 255]', () => {
    const rgbObj = { r: 252, g: 3, b: 0, a: 1 };
    const expectedHslObj = { h: 1, s: 1, l: 0.49, a: 1 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should convert a valid RGB object with alpha channel to a valid HSL object', () => {
    const rgbObj = { r: 53, g: 135, b: 29, a: 0.34 };
    const expectedHslObj = { h: 106, s: 0.65, l: 0.32, a: 0.34 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should convert a valid RGB object with minimum values to a valid HSL object', () => {
    const rgbObj = { r: 0, g: 0, b: 0, a: 1 };
    const expectedHslObj = { h: 0, s: 0, l: 0, a: 1 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should convert an RGB object with maximum values to a valid HSL object', () => {
    const rgbObj = { r: 255, g: 255, b: 255, a: 1 };
    const expectedHslObj = { h: 0, s: 0, l: 1, a: 1 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should convert a valid RGB object with equal values to a valid HSL object with saturation set to 0', () => {
    const rgbObj = { r: 128, g: 128, b: 128, a: 1 };
    const expectedHslObj = { h: 0, s: 0, l: 0.5, a: 1 };

    expect(rgbObjToHsl(rgbObj)).toEqual(expectedHslObj);
  });

  it('should throw an error when an invalid RGB object is passed', () => {
    const rgbObj = { r: 300, g: 0, b: 0, a: 1 };

    expect(() => {
      rgbObjToHsl(rgbObj);
    }).toThrowError('Invalid RGB value: 300');
  });

  it('should throw an error when an invalid alpha channel value is passed', () => {
    const rgbObj = { r: 255, g: 0, b: 0, a: -0.5 };

    expect(() => {
      rgbObjToHsl(rgbObj);
    }).toThrowError('Invalid alpha channel value: -0.5');
  });
});
