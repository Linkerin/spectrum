import _clampValues from './_clampValues';

describe('_clampValues', () => {
  it('should return the value itself when it is within the specified range', () => {
    const result = _clampValues(0, 10, 5);
    expect(result).toBe(5);
  });

  it('should return the minimum range value when the value is less than the minimum range', () => {
    const result = _clampValues(0, 10, -5);
    expect(result).toBe(0);
  });

  it('should return the maximum range value when the value is greater than the maximum range', () => {
    const result = _clampValues(0, 10, 15);
    expect(result).toBe(10);
  });

  it('should return the minimum range value when the value is equal to the minimum range', () => {
    const result = _clampValues(0, 10, 0);
    expect(result).toBe(0);
  });

  it('should return the maximum range value when the value is equal to the maximum range', () => {
    const result = _clampValues(0, 10, 10);
    expect(result).toBe(10);
  });

  it('should return the minimum range value when the minimum range is greater than the maximum range', () => {
    const result = _clampValues(10, 5, 7);
    expect(result).toBe(10);
  });

  it('should return the maximum range value when the maximum range is less than the minimum range', () => {
    const result = _clampValues(10, 0, 5);
    expect(result).toBe(10);
  });

  it('should throw an error when the value is NaN', () => {
    expect(() => _clampValues(0, 10, NaN)).toThrowError(
      'One or more parameters are NaN'
    );
  });

  it('should throw an error when the value is undefined', () => {
    // @ts-expect-error
    expect(() => _clampValues(0, 10, undefined)).toThrowError(
      'One or more parameters are not numbers'
    );
  });

  it('should throw an error when the value is null', () => {
    // @ts-expect-error
    expect(() => _clampValues(0, 10, null)).toThrowError(
      'One or more parameters are not numbers'
    );
  });

  it('should throw an error when the minimum value is not a number', () => {
    // @ts-expect-error
    expect(() => _clampValues('0', 10, 3)).toThrowError(
      'One or more parameters are not numbers'
    );
  });

  it('should throw an error when the maximim value is not a number', () => {
    // @ts-expect-error
    expect(() => _clampValues(0, '10', 5)).toThrowError(
      'One or more parameters are not numbers'
    );
  });

  // Returns the maximum range value if the value is Infinity.
  it('should return the maximum range value when the value is Infinity', () => {
    const result = _clampValues(0, 10, Infinity);
    expect(result).toBe(10);
  });
});
