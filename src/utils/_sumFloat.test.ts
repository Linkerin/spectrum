import _sumFloat from './_sumFloat';
describe('_sumFloat', () => {
  it('should return the sum of two positive integers as a floating-point number with two decimal places', () => {
    expect(_sumFloat(2, 3)).toBe(5);
  });

  it('should return the sum of two negative integers as a floating-point number with two decimal places', () => {
    expect(_sumFloat(-2, -3)).toBe(-5);
  });

  it('should return the sum of one positive and one negative integer as a floating-point number with two decimal places', () => {
    expect(_sumFloat(2, -3)).toBe(-1.0);
  });

  it('should return the sum of zero and a positive integer as a floating-point number with two decimal places', () => {
    expect(_sumFloat(0, 5)).toBe(5.0);
  });

  it('should return the sum of zero and a negative integer as a floating-point number with two decimal places', () => {
    expect(_sumFloat(0, -5)).toBe(-5.0);
  });

  it('should return the sum of Infinity and a number as a floating-point number with two decimal places', () => {
    expect(_sumFloat(Infinity, 5)).toBe(Infinity);
  });

  it('should return the sum of two floating-point numbers as a floating-point number with two decimal places', () => {
    expect(_sumFloat(2.5, 3.7)).toBe(6.2);
  });

  it('should return the sum of one integer and one floating-point number as a floating-point number with two decimal places', () => {
    expect(_sumFloat(2, 3.5)).toBe(5.5);
  });

  it('should return the sum of two very small numbers as a floating-point number with two decimal places', () => {
    expect(_sumFloat(0.0001, 0.0002)).toBe(0);
  });

  it('should throw an error when one or both inputs are non-numeric', () => {
    // @ts-expect-error
    expect(() => _sumFloat('a', 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat(2, 'b')).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat('c', {})).toThrowError(TypeError);
  });

  it('should throw an error when one or both inputs are null', () => {
    // @ts-expect-error
    expect(() => _sumFloat(null, 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat(2, null)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat(null, null)).toThrowError(TypeError);
  });

  it('should throw an error when one or both inputs are undefined', () => {
    // @ts-expect-error
    expect(() => _sumFloat(undefined, 5)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat(2, undefined)).toThrowError(TypeError);
    // @ts-expect-error
    expect(() => _sumFloat(undefined, undefined)).toThrowError(TypeError);
  });
});
