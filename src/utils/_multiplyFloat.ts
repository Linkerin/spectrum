/**
 * A function that takes two numbers as inputs
 * and returns their multiplication result as a floating-point number
 * with two decimal places.
 *
 * @param {number} a -  The first number
 * @param {number} b - The second number
 * @return {number} The sum of the two numbers
 */
function _multiplyFloat(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Invalid argument: one or more arguments is `NaN`');
  }

  const result = parseFloat((a * b).toFixed(2));

  return result;
}
export default _multiplyFloat;
