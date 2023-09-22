/**
 * Checks if a given weight value is valid
 *
 * @param weight - The weight value to be checked. Must be a number between 0 and 1 (inclusive)
 * @throws {Error} - If the weight value is not a number or if it is outside the range [0, 1]
 * @returns {boolean} - True if the weight value is valid
 */
function _checkWeightValue(weight: number): boolean {
  if (typeof weight !== 'number') {
    throw new Error(
      `Invalid weight: ${weight}. Weight value has to be a number`
    );
  }

  if (isNaN(weight)) {
    throw new Error(`Invalid weight: the 'NaN' value provided`);
  }

  if (weight < 0 || weight > 1) {
    throw new Error(
      `Invalid weight: ${weight}. Weight value has to be a percent in range [0; 1]`
    );
  }

  return true;
}

export default _checkWeightValue;
