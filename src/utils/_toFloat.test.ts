import _toFloat from './_toFloat';

describe('_toFloat', () => {
  it('should convert a string to a floating-point number', () => {
    const positive = _toFloat('3.14');
    const negative = _toFloat('-3.14');

    expect(positive).toBe(3.14);
    expect(negative).toBe(-3.14);
  });

  // Converts a percentage string to a floating-point number
  it('should convert a percentage string to a floating-point number', () => {
    const positive = _toFloat('50%');
    const negative = _toFloat('-50%');

    expect(positive).toBe(0.5);
    expect(negative).toBe(-0.5);
  });

  it('should return null when given null', () => {
    const result = _toFloat(null);
    expect(result).toBeNull();
  });

  it('should return null when given undefined', () => {
    const result = _toFloat(undefined);
    expect(result).toBeNull();
  });

  it('should return null when given an empty string', () => {
    const result = _toFloat('');
    expect(result).toBeNull();
  });

  it('should return null when given a string with no numbers', () => {
    const result = _toFloat('abc');
    expect(result).toBeNull();
  });

  it('should return null when given a string with only a decimal point', () => {
    const result = _toFloat('.');
    expect(result).toBeNull();
  });

  it('should convert a string with an exponential notation', () => {
    const result = _toFloat('1e10');
    expect(result).toBe(10000000000);
  });
});
