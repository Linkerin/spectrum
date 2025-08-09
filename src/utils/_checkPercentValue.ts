/**
 * Validates the percentage values
 *
 * @param {string} value - The value to be validated
 * @param type - The type of value being validated
 * @throws {Error} If the value is not a string or does not match the required format
 * @returns {boolean} `true` if the check is passed otherwise throws an error
 */
function _checkPercentValue(
  value: string,
  type: 'saturation' | 'lightness' | 'blackness' | 'whiteness'
): boolean {
  const percentRangeRegExp = new RegExp(/^[+-]?\d{1,2}(\.\d+)?%|100(\.0+)?%$/);
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);
  if (typeof value !== 'string') {
    throw new Error(
      `Invalid value: '${value}'. ${typeName} value has to be a string`
    );
  }

  if (!percentRangeRegExp.test(value)) {
    throw new Error(
      `Invalid value: '${value}'. ${typeName} value has to be a percent in range [-100%; 100%]`
    );
  }

  return true;
}

export default _checkPercentValue;
