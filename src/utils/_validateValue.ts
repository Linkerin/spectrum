import _toFloat from './_toFloat';

export type ValidationKeyType =
  | 'hue'
  | 'saturation'
  | 'lightness'
  | 'whiteness'
  | 'blackness'
  | 'alpha'
  | 'rgb';

/**
 * Validates hue, saturation, lightness, alpha, and rgb values
 * based on the given `type` parameter.
 *
 * @param type - The type of value to be validated.
 * @param value - The value to be validated. It can be a number or a string representation of a number.
 * @returns {number} The validated and converted value based on the given type.
 * @throws Error if the value is invalid.
 */
function _validateValue(type: ValidationKeyType, value: unknown): number {
  switch (type) {
    case 'hue': {
      const h = Number.parseInt(value as string);
      if (isNaN(h) || h > 360 || h < 0) {
        throw new Error(`Invalid hue value: ${value})}`);
      }

      return h;
    }

    case 'saturation':
    case 'lightness':
    case 'blackness':
    case 'whiteness': {
      const v = _toFloat(value);
      if (v === null || v > 1 || v < 0) {
        throw new Error(`Invalid ${type} value: ${value}`);
      }

      return v;
    }

    case 'alpha': {
      let a = _toFloat(value);
      if (a === null) a = 1;

      if (a > 1 || a < 0) {
        throw new Error(`Invalid alpha channel value: ${value})}`);
      }
      a = Number(a.toFixed(2));

      return a;
    }

    case 'rgb': {
      const channel = Number.parseInt(value as string);
      if (isNaN(channel) || channel > 255 || channel < 0) {
        throw new Error(`Invalid RGB value: ${value}`);
      }

      return channel;
    }

    default:
      throw new Error(`Invalid type for value validation: '${type}'`);
  }
}

export default _validateValue;
