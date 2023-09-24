import rgbObjToHex from './rgbObjToHex';

describe('rgbObjToHex', () => {
  it('should return a valid hex code when all channels and alpha are set to 1', () => {
    const rgbObj = { r: 255, g: 255, b: 255, a: 1 };
    const result = rgbObjToHex(rgbObj);
    expect(result).toBe('#ffffff');
  });

  it('should return a valid hex code when all channels and alpha are set to 0', () => {
    const rgbObj = { r: 0, g: 0, b: 0, a: 0 };
    const result = rgbObjToHex(rgbObj);
    expect(result).toBe('#00000000');
  });

  it('should return a valid hex code when alpha is set to 0.85', () => {
    const rgbObj = { r: 132, g: 45, b: 100, a: 0.85 };
    const result = rgbObjToHex(rgbObj);
    expect(result).toBe('#842d64d9');
  });

  it('should return a valid hex code when alpha is set to 0', () => {
    const rgbObj = { r: 0, g: 98, b: 113, a: 0 };
    const result = rgbObjToHex(rgbObj);
    expect(result).toBe('#00627100');
  });

  it('should throw an error when the red channel value is invalid', () => {
    const rgbObj = { r: -1, g: 0, b: 0, a: 1 };
    expect(() => {
      rgbObjToHex(rgbObj);
    }).toThrowError('Invalid RGB value: -1');
  });

  it('should throw an error when the green channel value is invalid', () => {
    const rgbObj = { r: 0, g: 256, b: 0, a: 1 };
    expect(() => {
      rgbObjToHex(rgbObj);
    }).toThrowError('Invalid RGB value: 256');
  });

  it('should throw an error when the blue channel value is invalid', () => {
    const rgbObj = { r: 0, g: 0, b: -1, a: 1 };
    expect(() => {
      rgbObjToHex(rgbObj);
    }).toThrowError('Invalid RGB value: -1');
  });

  it('should throw an error when the alpha channel value is invalid', () => {
    const rgbObj = { r: 255, g: 255, b: 255, a: -0.5 };
    expect(() => rgbObjToHex(rgbObj)).toThrowError(
      'Invalid alpha channel value: -0.5)'
    );
  });
});
