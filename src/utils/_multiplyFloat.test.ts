import _multiplyFloat from './_multiplyFloat';
describe('_multiplyFloat', () => {
  it('should return the multiplication result of two positive integers as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(2, 3)).toBe(6);
  });

  it('should return the multiplication result of two negative integers as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(-2, -3)).toBe(6);
  });

  it('should return the multiplication result of one positive and one negative integer as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(2, -3)).toBe(-6.0);
  });

  it('should return the multiplication result of zero and a positive integer as a floating-point number', () => {
    expect(_multiplyFloat(0, 5)).toBe(0);
  });

  it('should return the multiplication result of zero and a negative integer as a floating-point number', () => {
    expect(_multiplyFloat(0, -5)).toBe(0);
  });

  it('should return the multiplication result of Infinity and a number as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(Infinity, 5)).toBe(Infinity);
  });

  it('should return the multiplication result of two floating-point numbers as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(2.5, 3.7)).toBe(9.25);
  });

  it('should return the multiplication result of one integer and one floating-point number as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(2, 3.5)).toBe(7.0);
  });

  it('should return the multiplication result of two very small numbers as a floating-point number with two decimal places', () => {
    expect(_multiplyFloat(0.0001, 0.0002)).toBe(0);
  });

  it('should throw an error when one or both inputs are NaN', () => {
    expect(() => _multiplyFloat(NaN, 5)).toThrowError(
      'Invalid argument: one or more arguments is `NaN`'
    );
    expect(() => _multiplyFloat(2, NaN)).toThrowError(
      'Invalid argument: one or more arguments is `NaN`'
    );
    expect(() => _multiplyFloat(NaN, NaN)).toThrowError(
      'Invalid argument: one or more arguments is `NaN`'
    );
  });

  it('should throw an error when one or both inputs are non-numeric', () => {
    // @ts-expect-error
    expect(() => _multiplyFloat('a', 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat(2, 'b')).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat('c', {})).toThrowError(TypeError);
  });

  it('should throw an error when one or both inputs are null', () => {
    // @ts-expect-error
    expect(() => _multiplyFloat(null, 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat(2, null)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat(null, null)).toThrowError(TypeError);
  });

  it('should throw an error when one or both inputs are undefined', () => {
    // @ts-expect-error
    expect(() => _multiplyFloat(undefined, 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat(2, undefined)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _multiplyFloat(undefined, undefined)).toThrowError(TypeError);
  });
});
