import onBgColor from './onBgColor';
import Spectrum from '../spectrum';

describe('onBgColor', () => {
  it('should return the "dark" value when the background color is white', () => {
    const colorObj = new Spectrum('hex', '#fff');
    const options = {
      dark: '#000000',
      light: '#ffffff'
    };

    const result = onBgColor(colorObj, options);

    expect(result).toBe(options.dark);
  });

  it('should return the "light" value when the background color is black', () => {
    const colorObj = new Spectrum('hex', '#000');
    const options = {
      dark: '#000000',
      light: '#ffffff'
    };

    const result = onBgColor(colorObj, options);

    expect(result).toBe(options.light);
  });

  it('should return the "dark" value when the background is light gray', () => {
    const colorObj = new Spectrum('rgb', [200, 200, 200]);
    const options = {
      dark: '#000000',
      light: '#ffffff'
    };

    const result = onBgColor(colorObj, options);

    expect(result).toBe(options.dark);
  });

  it('should return the "light" value when the background is dark gray', () => {
    const colorObj = new Spectrum('rgb', [100, 100, 100]);
    const options = {
      dark: '#000000',
      light: '#ffffff'
    };

    const result = onBgColor(colorObj, options);

    expect(result).toBe(options.light);
  });

  // MediumSlateBlue - https://www.w3schools.com/colors/color_tryit.asp?color=MediumSlateBlue
  it('should return the "light" value when the background is medium slate blue', () => {
    const mediumSlateBlue = new Spectrum('hex', '7B68EE');
    const options = {
      dark: new Spectrum('hex', '#111'),
      light: new Spectrum('hex', '#eee')
    };

    const result = onBgColor(mediumSlateBlue, options);

    expect(result).toBe(options.light);
  });

  it('should properly handle Spectrum instances as options values', () => {
    const colorObj = new Spectrum('hex', '5e68ba');
    const options = {
      dark: new Spectrum('hex', '#111'),
      light: new Spectrum('hex', '#eee')
    };

    const result = onBgColor(colorObj, options);

    expect(result).toBe(options.light);
  });

  it('should throw a TypeError if the background color is not an instance of the Spectrum class', () => {
    const colorObj = '#ffffff';
    const options = {
      dark: '#000000',
      light: '#ffffff'
    };

    expect(() => {
      // @ts-expect-error
      onBgColor(colorObj, options);
    }).toThrow(TypeError);
  });
});
