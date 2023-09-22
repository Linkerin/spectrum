import validateValue from './validateValue';

describe('validateValue', () => {
  it('should return a number between 0 and 360 when a valid hue value is provided', () => {
    expect(validateValue('hue', 180)).toBe(180);
    expect(validateValue('hue', '180')).toBe(180);
  });

  it('should return a number between 0 and 1 when a valid saturation value is provided', () => {
    expect(validateValue('saturation', 0.5)).toBe(0.5);
    expect(validateValue('saturation', '0.5')).toBe(0.5);
    expect(validateValue('saturation', '50%')).toBe(0.5);
  });

  it('should return a number between 0 and 1 when a valid lightness value is provided', () => {
    expect(validateValue('lightness', 0.8)).toBe(0.8);
    expect(validateValue('saturation', '0.8')).toBe(0.8);
    expect(validateValue('lightness', '80%')).toBe(0.8);
  });

  it('should return a number between 0 and 255 when a valid RGB value is provided', () => {
    expect(validateValue('rgb', 100)).toBe(100);
    expect(validateValue('rgb', '100')).toBe(100);
  });

  it('should return a number between 0 and 1 when a valid alpha value is provided', () => {
    expect(validateValue('alpha', 0.5)).toBe(0.5);
    expect(validateValue('alpha', '0.5')).toBe(0.5);
    expect(validateValue('alpha', '50%')).toBe(0.5);
  });

  it('should return 0 when a saturation or lightness value of 0 is provided', () => {
    expect(validateValue('saturation', 0)).toBe(0);
    expect(validateValue('saturation', '0')).toBe(0);
    expect(validateValue('lightness', 0)).toBe(0);
    expect(validateValue('lightness', '0')).toBe(0);
  });

  it('should return 1 when a saturation or lightness value of 1 is provided', () => {
    expect(validateValue('saturation', 1)).toBe(1);
    expect(validateValue('saturation', '1')).toBe(1);
    expect(validateValue('lightness', 1)).toBe(1);
    expect(validateValue('lightness', '1')).toBe(1);
  });

  it('should throw an error when an invalid hue value is provided', () => {
    expect(() => validateValue('hue', 'abc')).toThrowError(
      'Invalid hue value: abc)'
    );
    expect(() => validateValue('hue', 400)).toThrowError(
      'Invalid hue value: 400)'
    );
  });

  it('should throw an error when an invalid saturation value is provided', () => {
    expect(() => validateValue('saturation', 'abc')).toThrowError(
      'Invalid saturation value: abc'
    );
    expect(() => validateValue('saturation', 1.5)).toThrowError(
      'Invalid saturation value: 1.5'
    );
  });

  it('should throw an error when an invalid lightness value is provided', () => {
    expect(() => validateValue('lightness', 'abc')).toThrowError(
      'Invalid lightness value: abc'
    );
    expect(() => validateValue('lightness', -0.5)).toThrowError(
      'Invalid lightness value: -0.5'
    );
  });

  it('should throw an error when an invalid alpha value is provided', () => {
    expect(() => validateValue('alpha', -0.5)).toThrowError(
      'Invalid alpha channel value: -0.5)'
    );
    expect(() => validateValue('alpha', 1.5)).toThrowError(
      'Invalid alpha channel value: 1.5)'
    );
  });

  it('should throw an error when an invalid RGB value is provided', () => {
    expect(() => validateValue('rgb', 'abc')).toThrowError(
      'Invalid RGB value: abc'
    );
    expect(() => validateValue('rgb', -1)).toThrowError(
      'Invalid RGB value: -1'
    );
    expect(() => validateValue('rgb', 256)).toThrowError(
      'Invalid RGB value: 256'
    );
  });

  it('should throw an error when a non-string and non-number value is provided', () => {
    expect(() => validateValue('hue', true)).toThrowError(
      'Invalid hue value: true'
    );
    expect(() => validateValue('saturation', false)).toThrowError(
      'Invalid saturation value: false'
    );
    expect(() => validateValue('lightness', null)).toThrowError(
      'Invalid lightness value: null'
    );
    expect(() => validateValue('rgb', {})).toThrowError(
      'Invalid RGB value: [object Object]'
    );
    // @ts-expect-error
    expect(() => validateValue('invalidType', 'value')).toThrowError(
      "Invalid type for value validation: 'invalidType'"
    );
  });

  it('should throw an error when a negative hue value is provided', () => {
    expect(() => validateValue('hue', -180)).toThrowError(
      'Invalid hue value: -180)'
    );
    expect(() => validateValue('hue', '-180')).toThrowError(
      'Invalid hue value: -180)'
    );
  });
});
