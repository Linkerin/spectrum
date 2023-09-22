/**
 * Converts a value to a floating-point number
 *
 * @param {string | number} value The value to be converted
 * @returns {number | null} Converted number if it was possible or `null`
 */
function _toFloat(value: string | number): number | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null;

  let converted;

  if (typeof value === 'string' && value.includes('%')) {
    converted = Number.parseFloat(value) / 100;
  } else {
    converted = Number.parseFloat(value.toString());
  }

  if (isNaN(converted)) converted = null;

  return converted;
}

export default _toFloat;
