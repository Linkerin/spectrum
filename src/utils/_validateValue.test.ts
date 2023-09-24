import _validateValue from './_validateValue';

describe('_validateValue', () => {
  it('should return a number between 0 and 360 when a valid hue value is provided', () => {
    expect(_validateValue('hue', 180)).toBe(180);
    expect(_validateValue('hue', '180')).toBe(180);
  });

  it('should return a number between 0 and 1 when a valid saturation value is provided', () => {
    expect(_validateValue('saturation', 0.5)).toBe(0.5);
    expect(_validateValue('saturation', '0.5')).toBe(0.5);
    expect(_validateValue('saturation', '50%')).toBe(0.5);
  });

  it('should return a number between 0 and 1 when a valid lightness value is provided', () => {
    expect(_validateValue('lightness', 0.8)).toBe(0.8);
    expect(_validateValue('saturation', '0.8')).toBe(0.8);
    expect(_validateValue('lightness', '80%')).toBe(0.8);
  });

  it('should return a number between 0 and 255 when a valid RGB value is provided', () => {
    expect(_validateValue('rgb', 100)).toBe(100);
    expect(_validateValue('rgb', '100')).toBe(100);
  });

  it('should return a number between 0 and 1 when a valid alpha value is provided', () => {
    expect(_validateValue('alpha', 0.5)).toBe(0.5);
    expect(_validateValue('alpha', '0.5')).toBe(0.5);
    expect(_validateValue('alpha', '50%')).toBe(0.5);
  });

  it('should return 0 when a saturation or lightness value of 0 is provided', () => {
    expect(_validateValue('saturation', 0)).toBe(0);
    expect(_validateValue('saturation', '0')).toBe(0);
    expect(_validateValue('lightness', 0)).toBe(0);
    expect(_validateValue('lightness', '0')).toBe(0);
  });

  it('should return 1 when a saturation or lightness value of 1 is provided', () => {
    expect(_validateValue('saturation', 1)).toBe(1);
    expect(_validateValue('saturation', '1')).toBe(1);
    expect(_validateValue('lightness', 1)).toBe(1);
    expect(_validateValue('lightness', '1')).toBe(1);
  });

  it('should throw an error when an invalid hue value is provided', () => {
    expect(() => _validateValue('hue', 'abc')).toThrowError(
      'Invalid hue value: abc)'
    );
    expect(() => _validateValue('hue', 400)).toThrowError(
      'Invalid hue value: 400)'
    );
  });

  it('should throw an error when an invalid saturation value is provided', () => {
    expect(() => _validateValue('saturation', 'abc')).toThrowError(
      'Invalid saturation value: abc'
    );
    expect(() => _validateValue('saturation', 1.5)).toThrowError(
      'Invalid saturation value: 1.5'
    );
  });

  it('should throw an error when an invalid lightness value is provided', () => {
    expect(() => _validateValue('lightness', 'abc')).toThrowError(
      'Invalid lightness value: abc'
    );
    expect(() => _validateValue('lightness', -0.5)).toThrowError(
      'Invalid lightness value: -0.5'
    );
  });

  it('should throw an error when an invalid alpha value is provided', () => {
    expect(() => _validateValue('alpha', -0.5)).toThrowError(
      'Invalid alpha channel value: -0.5)'
    );
    expect(() => _validateValue('alpha', 1.5)).toThrowError(
      'Invalid alpha channel value: 1.5)'
    );
  });

  it('should throw an error when an invalid RGB value is provided', () => {
    expect(() => _validateValue('rgb', 'abc')).toThrowError(
      'Invalid RGB value: abc'
    );
    expect(() => _validateValue('rgb', -1)).toThrowError(
      'Invalid RGB value: -1'
    );
    expect(() => _validateValue('rgb', 256)).toThrowError(
      'Invalid RGB value: 256'
    );
  });

  it('should throw an error when a non-string and non-number value is provided', () => {
    expect(() => _validateValue('hue', true)).toThrowError(
      'Invalid hue value: true'
    );
    expect(() => _validateValue('saturation', false)).toThrowError(
      'Invalid saturation value: false'
    );
    expect(() => _validateValue('lightness', null)).toThrowError(
      'Invalid lightness value: null'
    );
    expect(() => _validateValue('rgb', {})).toThrowError(
      'Invalid RGB value: [object Object]'
    );
    // @ts-expect-error
    expect(() => _validateValue('invalidType', 'value')).toThrowError(
      "Invalid type for value validation: 'invalidType'"
    );
  });

  it('should throw an error when a negative hue value is provided', () => {
    expect(() => _validateValue('hue', -180)).toThrowError(
      'Invalid hue value: -180)'
    );
    expect(() => _validateValue('hue', '-180')).toThrowError(
      'Invalid hue value: -180)'
    );
  });
});
