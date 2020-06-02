/**
 * Removes data-test attributes in components in production
 * @param {string} val - the string value of the data-test attribute you give to a component for testing
 * @returns {val} || {undefined}
 *
 * note - this function works because if an attribute is undefined it will not show up in the element.
 */
export function ifDev(val) {
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    return val;
  else return undefined;
}
