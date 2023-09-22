import _checkWeightValue from './_checkWeightValue';

describe('_checkWeightValue', () => {
  it('should return true when weight is a valid value between 0 and 1', () => {
    expect(_checkWeightValue(0.5)).toBe(true);
  });

  it('should handle 0 and 1 as valid weight values', () => {
    expect(_checkWeightValue(0)).toBe(true);
    expect(_checkWeightValue(1)).toBe(true);
  });

  it('should throw an error when weight is less than 0', () => {
    expect(() => _checkWeightValue(-0.5)).toThrowError(
      'Invalid weight: -0.5. Weight value has to be a percent in range [0; 1]'
    );
  });

  it('should throw an error when weight is greater than 1', () => {
    expect(() => _checkWeightValue(1.5)).toThrowError(
      'Invalid weight: 1.5. Weight value has to be a percent in range [0; 1]'
    );
  });

  it('should throw an error when weight is not a number', () => {
    // @ts-expect-error
    expect(() => _checkWeightValue('invalid')).toThrowError(
      'Invalid weight: invalid. Weight value has to be a number'
    );
  });

  // Should handle null and undefined values as invalid weight values
  it('should throw an error when weight is undefined', () => {
    // @ts-expect-error
    expect(() => _checkWeightValue(undefined)).toThrowError(
      'Invalid weight: undefined. Weight value has to be a number'
    );
    // @ts-expect-error
    expect(() => _checkWeightValue(null)).toThrowError(
      'Invalid weight: null. Weight value has to be a number'
    );
  });
});
