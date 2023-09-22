import Spectrum from './spectrum';

describe('Spectrum', () => {
  it('should create a new instance of Spectrum with valid hex color value', () => {
    const hex = '#FF0000';
    const hexLower = hex.toLowerCase();
    const hexShortened = '#F00';
    const hexShortenedLower = hexShortened.toLowerCase();
    const noHash = hex.replace(/#/, '');
    const noHashShortened = hex.replace(/#/, '');

    for (const option of [
      hex,
      hexLower,
      hexShortened,
      hexShortenedLower,
      noHash,
      noHashShortened
    ]) {
      const hexColor = new Spectrum('hex', option);
      expect(hexColor.rgb).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexColor.hsl).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
      expect(hexColor.hex).toEqual('#ff0000');
    }
  });

  it('should create a new instance of Spectrum with valid hex color value with alpha channel', () => {
    const hex = '#EE88AA99';
    const hexLower = hex.toLowerCase();
    const hexShortened = '#E8A9';
    const hexShortenedLower = hexShortened.toLowerCase();
    const noHash = hex.replace(/#/, '');
    const noHashShortened = hex.replace(/#/, '');

    for (const option of [
      hex,
      hexLower,
      hexShortened,
      hexShortenedLower,
      noHash,
      noHashShortened
    ]) {
      const hexColor = new Spectrum('hex', option);
      expect(hexColor.rgb).toEqual({ r: 238, g: 136, b: 170, a: 0.6 });
      expect(hexColor.hsl).toEqual({ h: 340, s: 0.74, l: 0.73, a: 0.6 });
      expect(hexColor.hex).toEqual('#ee88aa99');
    }
  });

  it('should create a new instance of Spectrum with valid rgb color value', () => {
    const arrayValue = [100, 150, 200];
    const stringValue = '100 150 200';
    const stringValueWithCommas = '100, 150, 200';

    for (const option of [arrayValue, stringValue, stringValueWithCommas]) {
      const rgbColor = new Spectrum('rgb', option);
      expect(rgbColor.rgb).toEqual({ r: 100, g: 150, b: 200, a: 1 });
      expect(rgbColor.hsl).toEqual({
        h: 210,
        s: 0.48,
        l: 0.59,
        a: 1
      });
      expect(rgbColor.hex).toEqual('#6496c8');
    }
  });

  it('should create a new instance of Spectrum with valid hsl color value', () => {
    const arrayValue = [230, 0.35, 0.2, 0.89];
    const stringValue = '230 0.35 0.2 0.89';
    const stringValueWithCommas = '230, 0.35, 0.2, 0.89';

    for (const option of [arrayValue, stringValue, stringValueWithCommas]) {
      const hslColor = new Spectrum('hsl', option);
      expect(hslColor.rgb).toEqual({ r: 33, g: 39, b: 69, a: 0.89 });
      expect(hslColor.hsl).toEqual({ h: 230, s: 0.35, l: 0.2, a: 0.89 });
      expect(hslColor.hex).toEqual('#212745e3');
    }
  });

  it('should return the RGB object of the Spectrum instance', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    const rgbObj = spectrum.rgb;
    expect(rgbObj).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should return the HSL object of the Spectrum instance', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    const hslObj = spectrum.hsl;
    expect(hslObj).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
  });

  it('should get the hex color value from Spectrum instance', () => {
    const spectrum = new Spectrum('hex', '#FFAA32');
    expect(spectrum.hex).toEqual('#ffaa32');
  });

  it('should return the alpha channel value of the color', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    expect(spectrum.alpha).toEqual(1);
  });

  it('should return the red channel value of the color', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    expect(spectrum.red).toEqual(255);
  });

  it('should get the green channel value from Spectrum instance', () => {
    const spectrum = new Spectrum('hex', '#00ff00');
    expect(spectrum.green).toEqual(255);
  });

  it('should get the blue channel value from Spectrum instance', () => {
    const spectrum = new Spectrum('hex', '#0000ff');
    expect(spectrum.blue).toEqual(255);
  });

  it('should return the hue value of the color', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    expect(spectrum.hue).toEqual(0);
  });

  it('should return the correct saturation value', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    expect(spectrum.saturation).toEqual(1);
  });

  it('should return the lightness value of the color', () => {
    const spectrum = new Spectrum('hex', '#ff0000');
    expect(spectrum.lightness).toEqual(0.5);
  });

  it('should create a new instance of Spectrum using fromHslObj with valid HSL object', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);
    expect(spectrum.rgb).toEqual({ r: 159, g: 223, b: 223, a: 1 });
    expect(spectrum.hsl).toEqual({ h: 180, s: 0.5, l: 0.75, a: 1 });
    expect(spectrum.hex).toEqual('#9fdfdf');
  });

  it('should create a new instance of Spectrum using fromRgbObj with valid RGB object', () => {
    const rgbObj = { r: 255, g: 0, b: 0, a: 1 };
    const spectrum = Spectrum.fromRgbObj(rgbObj);
    expect(spectrum.rgb).toEqual(rgbObj);
    expect(spectrum.hsl).toEqual({ h: 0, s: 1, l: 0.5, a: 1 });
    expect(spectrum.hex).toEqual('#ff0000');
  });

  it('should not allow to change rgb object of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let rgbObj = spectrum.rgb;
    rgbObj = { r: 225, g: 255, b: 255, a: 1 };

    expect(spectrum.rgb).not.toEqual(rgbObj);
    expect(spectrum.rgb).toEqual({ r: 159, g: 223, b: 223, a: 1 });
  });

  it('should not allow to change hsl object of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let hsl = spectrum.hsl;
    hsl = { h: 225, s: 0.2, l: 0.3, a: 0.8 };

    expect(spectrum.hsl).not.toEqual(hsl);
    expect(spectrum.hsl).toEqual({ h: 180, s: 0.5, l: 0.75, a: 1 });
  });

  it('should not allow to change hex value of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let hex = spectrum.hex;
    hex = '#ff00aa';

    expect(spectrum.hex).not.toEqual(hex);
    expect(spectrum.hex).toEqual('#9fdfdf');
  });

  it('should not allow to change alpha value of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let a = spectrum.alpha;
    a = 0.3;

    expect(spectrum.alpha).not.toEqual(a);
    expect(spectrum.alpha).toEqual(1);
  });

  it('should not allow to change hue value of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let h = spectrum.hue;
    h = 10;

    expect(spectrum.hue).not.toEqual(h);
    expect(spectrum.hue).toEqual(180);
  });

  it('should not allow to change saturation value of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let s = spectrum.saturation;
    s = 1;

    expect(spectrum.saturation).not.toEqual(s);
    expect(spectrum.saturation).toEqual(0.5);
  });

  it('should not allow to change lightness value of the instance', () => {
    const hslObj = { h: 180, s: 0.5, l: 0.75, a: 1 };
    const spectrum = Spectrum.fromHslObj(hslObj);

    let l = spectrum.lightness;
    l = 1;

    expect(spectrum.lightness).not.toEqual(l);
    expect(spectrum.lightness).toEqual(0.75);
  });

  it('should not allow to change red value of the instance', () => {
    const rgbObj = { r: 135, g: 15, b: 230, a: 0.7 };
    const spectrum = Spectrum.fromRgbObj(rgbObj);

    let r = spectrum.red;
    r = 255;

    expect(spectrum.red).not.toEqual(r);
    expect(spectrum.red).toEqual(135);
  });

  it('should not allow to change green value of the instance', () => {
    const rgbObj = { r: 135, g: 15, b: 230, a: 0.7 };
    const spectrum = Spectrum.fromRgbObj(rgbObj);

    let g = spectrum.green;
    g = 255;

    expect(spectrum.green).not.toEqual(g);
    expect(spectrum.green).toEqual(15);
  });

  it('should not allow to change blue value of the instance', () => {
    const rgbObj = { r: 135, g: 15, b: 230, a: 0.7 };
    const spectrum = Spectrum.fromRgbObj(rgbObj);

    let b = spectrum.blue;
    b = 255;

    expect(spectrum.blue).not.toEqual(b);
    expect(spectrum.blue).toEqual(230);
  });

  it('should throw an error when creating a new instance of Spectrum with invalid hex color value', () => {
    expect(() => {
      new Spectrum('hex', '#ff0g');
    }).toThrow('Invalid HEX color value: #ff0g');
  });

  it('should throw an error when creating a new instance of Spectrum with empty hex value', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('hex');
    }).toThrow('No color value was provided');
  });

  it('should throw an error when creating a new instance of Spectrum with hex color value of invalid type', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('hex', { invalid: true });
    }).toThrow('Color value has to be a string');
  });

  it('should throw an error when creating a new instance of Spectrum with invalid rgb color value', () => {
    expect(() => {
      new Spectrum('rgb', [100, 150]);
    }).toThrow('Invalid RGB values array: 100,150');
  });

  it('should throw an error when creating a new instance of Spectrum with invalid alpha channel value', () => {
    expect(() => {
      new Spectrum('rgb', [255, 0, 0, 1.5]);
    }).toThrow('Invalid alpha channel value: 1.5');
  });

  it('should throw an error when creating a new instance of Spectrum with empty rgb color value', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('rgb');
    }).toThrow('RGB color value has to be a string or an Array');
  });

  it('should throw an error when creating a new instance of Spectrum with invalid numeric rgb color value', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('rgb', 10);
    }).toThrow('RGB color value has to be a string or an Array');
  });

  it('should throw an error when creating a new instance of Spectrum with invalid hsl color value', () => {
    expect(() => {
      new Spectrum('hsl', [180, 0.5]);
    }).toThrow('Invalid HSL values array: 180,0.5');
  });

  it('should throw an error when creating a new instance of Spectrum with hsl alpha channel', () => {
    expect(() => {
      new Spectrum('hsl', [180, 0.5, 0.2, 1.1]);
    }).toThrow('Invalid alpha channel value: 1.1');
  });

  it('should throw an error when creating a new instance of Spectrum with invalid numeric hsl color valuee', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('hsl', 10);
    }).toThrow('HSL color value has to be a string or an Array');
  });

  it('should throw an error when creating a new instance with an invalid color space value', () => {
    expect(() => {
      // @ts-expect-error
      new Spectrum('invalid', '#ff0000');
    }).toThrow('Invalid color space value');
  });

  it('should throw an error when creating a new instance using fromRgbObj method with an undefined value', () => {
    expect(() => {
      // @ts-expect-error
      Spectrum.fromRgbObj({ r: 255, g: 255, a: 0.1 });
    }).toThrow('Invalid RGB object');
  });

  it('should throw an error when creating a new instance using fromHslObj method with an undefined value', () => {
    expect(() => {
      // @ts-expect-error
      Spectrum.fromHslObj({ h: 100, l: 0.38, a: 0.98 });
    }).toThrow('Invalid HSL object');
  });
});
