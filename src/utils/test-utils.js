// test-utils.js
const domTestingLib = require("@testing-library/dom");
const { queryHelpers } = domTestingLib;

/**
 * Uses queryHelper methods from react-testing-library to create customer helpers
 * src = https://testing-library.com/docs/dom-testing-library/api-helpers
 */

// mapping these helper functions to find data-test as an attribute for a node element
export const queryByTestId = queryHelpers.queryByAttribute.bind(
  null,
  "data-test"
);
export const queryAllByTestId = queryHelpers.queryAllByAttribute.bind(
  null,
  "data-test"
);

/**
 * Returns node(s) with the given data-test attribute.
 * @param {object} container - Whatever node element is wrapping the data-test.
 * @param {string} id - value of data-test attribute for search.
 * @param  {...object} rest - handling the props object.
 * @returns {container}
 */
export function getAllByTestId(container, id, ...rest) {
  const els = queryAllByTestId(container, id, ...rest);
  if (!els.length) {
    throw queryHelpers.getMultipleElementsFoundError(
      `Unable to find an element by: [data-test="${id}"]`,
      container
    );
  }
  return els;
}

export function getByTestId(...args) {
  const result = getAllByTestId(...args);
  if (result.length > 0) {
    return result[0];
  }
  return null;
}





// re-export with overrides
module.exports = {
  ...domTestingLib,
  getByTestId,
  getAllByTestId,
  queryByTestId,
  queryAllByTestId,

};
