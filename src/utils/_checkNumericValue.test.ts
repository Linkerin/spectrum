import _checkNumericValue from './_checkNumericValue';

describe('_checkNumericValue', () => {
  const stringValue = 'invalid';

  it('should accept a valid numeric value for Hue', () => {
    expect(_checkNumericValue(180, 'Hue')).toBe(true);
  });

  it('should accept a valid numeric value for Alpha', () => {
    expect(_checkNumericValue(0.5, 'Alpha')).toBe(true);
  });

  it('should accept a valid numeric value for RGB', () => {
    expect(_checkNumericValue(100, 'RGB')).toBe(true);
  });

  it('should accept a value of 0 for Hue', () => {
    expect(_checkNumericValue(0, 'Hue')).toBe(true);
  });

  it('should accept a value of 0 for Alpha', () => {
    expect(_checkNumericValue(0, 'Alpha')).toBe(true);
  });

  it('should accept a value of 0 for RGB', () => {
    expect(_checkNumericValue(0, 'RGB')).toBe(true);
  });

  it('should accept the minimum value for Hue (-360)', () => {
    expect(_checkNumericValue(-360, 'Hue')).toBe(true);
  });

  it('should accept a valid numeric value for Hue', () => {
    expect(_checkNumericValue(360, 'Hue')).toBe(true);
  });

  it('should accept the minimum value for Alpha (-1)', () => {
    expect(_checkNumericValue(-1, 'Alpha')).toBe(true);
  });

  it('should accept the maximum value for Alpha', () => {
    expect(_checkNumericValue(1, 'Alpha')).toBe(true);
  });

  it('should accept the minimum value for RGB (-255)', () => {
    expect(_checkNumericValue(-255, 'RGB')).toBe(true);
  });

  it('should accept the maximum value for RGB', () => {
    expect(_checkNumericValue(255, 'RGB')).toBe(true);
  });

  it('should throw an error when a non-numeric value is provided for Hue', () => {
    expect(() => {
      _checkNumericValue(stringValue, 'Hue');
    }).toThrowError(
      `Invalid value: '${stringValue}'. Hue value has to be a number`
    );
  });

  it('should throw an error when a non-numeric value is provided for Alpha', () => {
    expect(() => {
      _checkNumericValue(stringValue, 'Alpha');
    }).toThrowError(
      `Invalid value: '${stringValue}'. Alpha value has to be a number`
    );
  });

  it('should throw an error when a non-numeric value is provided for RGB', () => {
    expect(() => {
      _checkNumericValue(stringValue, 'RGB');
    }).toThrowError(
      `Invalid value: '${stringValue}'. RGB value has to be a number`
    );
  });

  it('should throw an error when the value is less than the minimum for Hue', () => {
    const value = -400;
    expect(() => _checkNumericValue(value, 'Hue')).toThrowError(
      `Invalid value: '${value}'. Hue has to be a number in range [-360; 360]`
    );
  });

  it('should throw an error when the value is greater than the maximum for Hue', () => {
    const value = 400;
    expect(() => _checkNumericValue(value, 'Hue')).toThrowError(
      `Invalid value: '${value}'. Hue has to be a number in range [-360; 360]`
    );
  });

  it('should throw an error when the value is less than the minimum for Alpha', () => {
    const value = -1.01;
    expect(() => _checkNumericValue(value, 'Alpha')).toThrowError(
      `Invalid value: '${value}'. Alpha has to be a number in range [-1; 1]`
    );
  });

  it('should throw an error when the value is greater than the maximum for Alpha', () => {
    const value = 1.01;
    expect(() => _checkNumericValue(value, 'Alpha')).toThrowError(
      `Invalid value: '${value}'. Alpha has to be a number in range [-1; 1]`
    );
  });

  it('should throw an error when the value is less than the minimum for RGB', () => {
    const value = 256;
    expect(() => _checkNumericValue(value, 'RGB')).toThrowError(
      `Invalid value: '${value}'. RGB has to be a number in range [-255; 255]`
    );
  });

  it('should throw an error when the value is greater than the maximum for RGB', () => {
    const value = -256;
    expect(() => _checkNumericValue(value, 'RGB')).toThrowError(
      `Invalid value: '${value}'. RGB has to be a number in range [-255; 255]`
    );
  });

  it('should throw an error when invalid checking type was provided', () => {
    // @ts-expect-error
    expect(() => _checkNumericValue(1, 'Invalid')).toThrowError(
      `Invalid type to check. Allowed values: 'Hue', 'Alpha', 'RGB'`
    );
  });
});
