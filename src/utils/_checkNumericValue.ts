type ValueType = 'Hue' | 'Alpha' | 'RGB';

/**
 * Checks that a value provided as hue, alpha or rgb channel
 * is a proper numeric value
 *
 * @param value The value to be checked
 * @param type  Specifies the type of the value:  `'Hue' | 'Alpha' | 'RGB'`
 * @throws {Error} - If the value is not a number or if it is outside
 * the valid range for the specified type.
 * @returns {boolean} `true` if the check is passed otherwise throws an error
 */
function _checkNumericValue(value: number | string, type: ValueType): boolean {
  if (typeof value !== 'number') {
    throw new Error(
      `Invalid value: '${value}'. ${type} value has to be a number`
    );
  }

  let minValue = 0;
  let maxValue = 0;

  switch (type) {
    case 'Hue':
      minValue = -360;
      maxValue = 360;
      break;

    case 'Alpha':
      minValue = -1;
      maxValue = 1;
      break;

    case 'RGB':
      minValue = -255;
      maxValue = 255;
      break;

    default:
      throw new Error(
        `Invalid type to check. Allowed values: 'Hue', 'Alpha', 'RGB'`
      );
  }

  if (value < minValue || value > maxValue) {
    throw new Error(
      `Invalid value: '${value}'. ${type} has to be a number in range [${minValue}; ${maxValue}]`
    );
  }

  return true;
}

export default _checkNumericValue;
