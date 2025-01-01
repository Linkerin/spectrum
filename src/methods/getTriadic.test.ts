import getTriadic from './getTriadic';
import Spectrum from '../spectrum';

describe('getTriadic', () => {
  it('should return proper object with "secondary" and "tertiary" properties', () => {
    const color = new Spectrum('red');
    const triadic = getTriadic(color);

    expect(triadic).toHaveLength(2);

    const [secondary, tertiary] = triadic;
    expect(secondary).toBeInstanceOf(Spectrum);
    expect(tertiary).toBeInstanceOf(Spectrum);

    expect(secondary.hue).toBe(120);
    expect(secondary.saturation).toBe(1);
    expect(secondary.lightness).toBe(0.5);

    expect(tertiary.hue).toBe(240);
    expect(tertiary.saturation).toBe(1);
    expect(tertiary.lightness).toBe(0.5);
  });

  it('should return proper values for hue of 240', () => {
    const color = new Spectrum('hsl', [240, 0.5, 0.75, 1]);
    const [secondary, tertiary] = getTriadic(color);

    expect(secondary.hsl).toEqual({
      h: 0,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(tertiary.hsl).toEqual({
      h: 120,
      s: 0.5,
      l: 0.75,
      a: 1
    });
  });

  it('should return same triadic colors when input color has a hue value of 0 and of 360', () => {
    const colorHue0 = new Spectrum('hsl', [0, 0.5, 0.75, 1]);
    const colorHue360 = new Spectrum('hsl', [360, 0.5, 0.75, 1]);

    const colorsFor0 = getTriadic(colorHue0);
    const colorsFor360 = getTriadic(colorHue360);

    expect(colorsFor0[0].hsl).toEqual({
      h: 120,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(colorsFor0[1].hsl).toEqual({
      h: 240,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(colorsFor360[0].hsl).toEqual(colorsFor0[0].hsl);
    expect(colorsFor360[1].hsl).toEqual(colorsFor0[1].hsl);
  });

  it('should work with input colors that have an alpha channel value', () => {
    const color = new Spectrum('hsl', [180, 0.5, 0.75, 0.5]);
    const [secondary, tertiary] = getTriadic(color);

    expect(secondary.hsl).toEqual({
      h: 300,
      s: 0.5,
      l: 0.75,
      a: 0.5
    });
    expect(tertiary.hsl).toEqual({
      h: 60,
      s: 0.5,
      l: 0.75,
      a: 0.5
    });
  });

  it('should throw a TypeError if the input color is not an instance of the Spectrum class', () => {
    const color = { hsl: { h: 180, s: 0.5, l: 0.75, a: 1 } };

    expect(() => {
      // @ts-expect-error
      getTriadic(color);
    }).toThrow(TypeError);
  });
});
