/**
 * Extracts and returns the first word (or class name) from an element's class list.
 *
 * @param {HTMLElement} element - The DOM element from which to extract the class name.
 * @returns {string} - The first class name or word.
 */
export function getFirstWord(element) {
  // Retrieve the class name from the provided DOM element.
  let str = element.className;

  // Remove any leading or trailing spaces from the string to ensure accurate processing.
  str = str.trim();

  // Identify the position of the first space in the string, which indicates the end of the first word or class name.
  const spaceIndex = str.indexOf(' ');

  // If there's no space, it means the element has only one class name. So, we return the entire string.
  if (spaceIndex === -1) {
    return str;
  }

  // If there's a space, it means there are multiple class names. We extract and return only the first one.
  // We achieve this by taking a substring of the string, starting from the beginning (0) up to the position of the first space.
  return str.substring(0, spaceIndex);
}
