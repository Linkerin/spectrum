import hexToRgb from './hexToRgb';

describe('hexToRgb', () => {
  it('should return an object with r, g, b, and a properties when given a valid hex color string', () => {
    const result = hexToRgb('#FF0000');
    expect(result).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should properly convert #67E660 color', () => {
    const hex = '#67E660';
    const lowerHex = hex.toLowerCase();
    const noHash = hex.replace(/#/, '');

    for (const option of [hex, lowerHex, noHash]) {
      const result = hexToRgb(option);
      expect(result).toEqual({ r: 103, g: 230, b: 96, a: 1 });
    }
  });

  it('should return an object with a valid alpha value when given a hex color string with an alpha channel', () => {
    const hex = '#FF000041';
    const lowerHex = hex.toLowerCase();
    const noHash = hex.replace(/#/, '');

    for (const option of [hex, lowerHex, noHash]) {
      const result = hexToRgb(option);
      expect(result).toEqual({ r: 255, g: 0, b: 0, a: 0.25 });
    }
  });

  it('should return an object with r, g, b, and a properties when given a valid 3-digit hex color string', () => {
    const hex = '#EAD';
    const lowerHex = hex.toLowerCase();
    const noHash = hex.replace(/#/, '');

    for (const option of [hex, lowerHex, noHash]) {
      const result = hexToRgb(option);
      expect(result).toEqual({ r: 238, g: 170, b: 221, a: 1 });
    }
  });

  it('should return an object with r, g, b, and a properties when given a valid 4-digit hex color string', () => {
    const hex = '#FE3B';
    const lowerHex = hex.toLowerCase();
    const noHash = hex.replace(/#/, '');

    for (const option of [hex, lowerHex, noHash]) {
      const result = hexToRgb(option);
      expect(result).toEqual({ r: 255, g: 238, b: 51, a: 0.73 });
    }
  });

  it('should throw an error when given a non-string value', () => {
    expect(() => {
      // @ts-expect-error
      hexToRgb(123);
    }).toThrow('Color value has to be a string');
  });

  it('should throw an error when given an empty string', () => {
    expect(() => {
      hexToRgb('');
    }).toThrow('No color value was provided');
  });

  it('should throw an error when given a hex color string with an invalid alpha channel value', () => {
    expect(() => {
      hexToRgb('#FF0000GG');
    }).toThrowError('Invalid HEX color value: #FF0000GG');
  });

  it('should throw an error when given an invalid hex color string', () => {
    expect(() => {
      hexToRgb('#ZEAB03');
    }).toThrow('Invalid HEX color value: #ZEAB03');

    expect(() => {
      hexToRgb('#ea');
    }).toThrow('Invalid HEX color value: #ea');

    expect(() => {
      hexToRgb('#4h3a');
    }).toThrow('Invalid HEX color value: #4h3a');

    expect(() => {
      hexToRgb('#4ea3f');
    }).toThrow('Invalid HEX color value: #4ea3f');

    expect(() => {
      hexToRgb('#4ea3f1212');
    }).toThrow('Invalid HEX color value: #4ea3f1212');

    expect(() => {
      hexToRgb('ea');
    }).toThrow('Invalid HEX color value: ea');

    expect(() => {
      hexToRgb('4h3a');
    }).toThrow('Invalid HEX color value: 4h3a');

    expect(() => {
      hexToRgb('4ea3f');
    }).toThrow('Invalid HEX color value: 4ea3f');

    expect(() => {
      hexToRgb('4ea3f1212');
    }).toThrow('Invalid HEX color value: 4ea3f1212');
  });
});
