import createPalette from './createPalette';
import Spectrum from '../spectrum';

describe('createPalette', () => {
  it('should return a palette object', () => {
    const colorObj = new Spectrum('hsl', [230, 0.5, 0.5]);
    const palette = createPalette(colorObj);
    for (let i = 0; i <= 100; i++) {
      expect(palette[i] instanceof Spectrum).toBe(true);
      expect(palette[i].hue).toEqual(colorObj.hue);
      expect(palette[i].saturation).toEqual(colorObj.saturation);
      expect(palette[i].alpha).toEqual(colorObj.alpha);
      expect(palette[i].lightness).toEqual(i / 100);
    }

    expect(colorObj.hex).toEqual(palette[50].hex);
    expect(colorObj.rgb).toEqual(palette[50].rgb);
  });

  it('should throw a TypeError for invalid input color object', () => {
    const colorObj = { hue: 180, saturation: 0.5, lightness: 0.5 };
    // @ts-expect-error
    expect(() => createPalette(colorObj)).toThrow(TypeError);
  });
});
