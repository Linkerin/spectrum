/**
 * Returns the clamped value within the specified range.
 * If the value is within the range, it returns the value itself.
 * If the value is less than the minimum range, it returns the minimum range value.
 * If the value is greater than the maximum range, it returns the maximum range value.
 *
 * @param min - The minimum value of the range
 * @param max - The maximum value of the range
 * @param value - The value to be clamped within the range
 * @returns The clamped value within the range of min and max
 *
 * @example
 * const result = _clampValues(0, 10, 5);
 * console.log(result); // Output: 5
 *
 * const result2 = _clampValues(0, 10, 15);
 * console.log(result2); // Output: 10
 *
 * const result3 = _clampValues(0, 10, -5);
 * console.log(result3); // Output: 0
 */
function _clampValues(min: number, max: number, value: number) {
  for (const param of [min, max, value]) {
    if (typeof param !== 'number') {
      throw new Error('One or more parameters are not numbers');
    }

    if (isNaN(param)) {
      throw new Error('One or more parameters are NaN');
    }
  }

  return Math.max(min, Math.min(max, value));
}

export default _clampValues;
