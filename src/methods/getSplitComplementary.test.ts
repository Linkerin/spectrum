import getSplitComplementary from './getSplitComplementary';
import Spectrum from '../spectrum';

describe('getSplitComplementary', () => {
  it('should return proper object with "secondary" and "tertiary" properties', () => {
    const color = new Spectrum('hsl', [30, 0.5, 0.75, 1]);
    const splitComplementaryColors = getSplitComplementary(color);

    expect(splitComplementaryColors).toHaveProperty('secondary');
    expect(splitComplementaryColors).toHaveProperty('tertiary');
    expect(splitComplementaryColors.secondary).toBeInstanceOf(Spectrum);
    expect(splitComplementaryColors.tertiary).toBeInstanceOf(Spectrum);

    expect(splitComplementaryColors.secondary.hsl).toEqual({
      h: 180,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(splitComplementaryColors.tertiary.hsl).toEqual({
      h: 240,
      s: 0.5,
      l: 0.75,
      a: 1
    });
  });

  it('should return proper values for hue of 180', () => {
    const color = new Spectrum('hsl', [180, 0.5, 0.75, 1]);
    const splitComplementaryColors = getSplitComplementary(color);

    expect(splitComplementaryColors.secondary.hsl).toEqual({
      h: 330,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(splitComplementaryColors.tertiary.hsl).toEqual({
      h: 30,
      s: 0.5,
      l: 0.75,
      a: 1
    });
  });

  it('should return proper values for hue of 214', () => {
    const color = new Spectrum('hsl', [214, 0.5, 0.75, 1]);
    const splitComplementaryColors = getSplitComplementary(color);

    expect(splitComplementaryColors.secondary.hsl).toEqual({
      h: 4,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(splitComplementaryColors.tertiary.hsl).toEqual({
      h: 64,
      s: 0.5,
      l: 0.75,
      a: 1
    });
  });

  it('should return same complementary colors when input color has a hue value of 0 and of 360', () => {
    const colorHue0 = new Spectrum('hsl', [0, 0.5, 0.75, 1]);
    const colorHue360 = new Spectrum('hsl', [0, 0.5, 0.75, 1]);

    const colorsFor0 = getSplitComplementary(colorHue0);
    const colorsFor360 = getSplitComplementary(colorHue360);

    expect(colorsFor0.secondary.hsl).toEqual({
      h: 150,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(colorsFor0.tertiary.hsl).toEqual({
      h: 210,
      s: 0.5,
      l: 0.75,
      a: 1
    });
    expect(colorsFor360.secondary.hsl).toEqual(colorsFor0.secondary.hsl);
    expect(colorsFor360.tertiary.hsl).toEqual(colorsFor0.tertiary.hsl);
  });

  it('should work with input colors that have an alpha channel value', () => {
    const color = new Spectrum('hsl', [180, 0.5, 0.75, 0.5]);
    const splitComplementaryColors = getSplitComplementary(color);

    expect(splitComplementaryColors.secondary.hsl).toEqual({
      h: 330,
      s: 0.5,
      l: 0.75,
      a: 0.5
    });
    expect(splitComplementaryColors.tertiary.hsl).toEqual({
      h: 30,
      s: 0.5,
      l: 0.75,
      a: 0.5
    });
  });

  it('should throw a TypeError if the input color is not an instance of the Spectrum class', () => {
    const color = { hsl: { h: 180, s: 0.5, l: 0.75, a: 1 } };

    expect(() => {
      // @ts-expect-error
      getSplitComplementary(color);
    }).toThrow(TypeError);
  });
});
