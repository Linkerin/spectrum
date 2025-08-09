import _checkPercentValue from './_checkPercentValue';

describe('_checkPercentValue', () => {
  it('should return true when given a valid string value for saturation and lightness percentage', () => {
    expect(_checkPercentValue('50%', 'saturation')).toBe(true);
    expect(_checkPercentValue('75%', 'lightness')).toBe(true);
  });

  it("should return true when given a valid string value for saturation and lightness percentage with '+' or '-' sign", () => {
    expect(_checkPercentValue('+25%', 'whiteness')).toBe(true);
    expect(_checkPercentValue('-50%', 'blackness')).toBe(true);
  });

  it("should return true when given a valid string value for saturation and lightness percentage with '0' before decimal point", () => {
    expect(_checkPercentValue('0.5%', 'saturation')).toBe(true);
    expect(_checkPercentValue('0.25%', 'lightness')).toBe(true);
  });

  it('should throw an error when given an invalid value type (not a string)', () => {
    // @ts-expect-error
    expect(() => _checkPercentValue(50, 'saturation')).toThrowError(
      `Invalid value: '50'. Saturation value has to be a string`
    );
    // @ts-expect-error
    expect(() => _checkPercentValue(true, 'lightness')).toThrowError(
      `Invalid value: 'true'. Lightness value has to be a string`
    );
    // @ts-expect-error
    expect(() => _checkPercentValue(undefined, 'whiteness')).toThrowError(
      `Invalid value: 'undefined'. Whiteness value has to be a string`
    );
    // @ts-expect-error
    expect(() => _checkPercentValue(null, 'blackness')).toThrowError(
      `Invalid value: 'null'. Blackness value has to be a string`
    );
  });

  it('should throw an error when given an invalid string value for saturation and lightness percentage with decimal point but no decimal value', () => {
    expect(() => _checkPercentValue('25.%', 'saturation')).toThrowError(
      `Invalid value: '25.%'. Saturation value has to be a percent in range [-100%; 100%]`
    );
    expect(() => _checkPercentValue('50.%', 'lightness')).toThrowError(
      `Invalid value: '50.%'. Lightness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should return true when given minimum and maximum values for saturation and lightness percentage', () => {
    expect(_checkPercentValue('100%', 'saturation')).toBe(true);
    expect(_checkPercentValue('-100%', 'saturation')).toBe(true);
    expect(_checkPercentValue('100%', 'lightness')).toBe(true);
    expect(_checkPercentValue('-100100%', 'lightness')).toBe(true);
  });

  it('should throw an error when given an invalid string value for saturation and lightness percentage', () => {
    expect(() => _checkPercentValue('150%', 'saturation')).toThrowError(
      `Invalid value: '150%'. Saturation value has to be a percent in range [-100%; 100%]`
    );
    expect(() => _checkPercentValue('200%', 'lightness')).toThrowError(
      `Invalid value: '200%'. Lightness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when given an invalid string value for saturation and lightness percentage less than -100%', () => {
    expect(() => {
      _checkPercentValue('-150%', 'saturation');
    }).toThrowError(
      `Invalid value: '-150%'. Saturation value has to be a percent in range [-100%; 100%]`
    );

    expect(() => {
      _checkPercentValue('-200%', 'lightness');
    }).toThrowError(
      `Invalid value: '-200%'. Lightness value has to be a percent in range [-100%; 100%]`
    );
  });

  it('should throw an error when given an invalid string value for lightness', () => {
    expect(() => {
      _checkPercentValue('xyz%', 'lightness');
    }).toThrowError(
      `Invalid value: 'xyz%'. Lightness value has to be a percent in range [-100%; 100%]`
    );
  });
});
