/**
 * The function encodes a given string using base64 encoding. It uses
 * the Buffer NodeJS class, but use whatever you're comfortable with.
 * @param stringToEncode - The parameter `stringToEncode` is a string
 * that needs to be encoded in base64 format. The function
 * `base64Encode` takes this string as input and returns the base64
 * encoded string.
 * @returns The function `base64Encode` takes a string as input,
 * encodes it in base64 format using the `Buffer.from()` method, and
 * returns the encoded string.
 */
const base64Encode = (stringToEncode: string) => {
  return Buffer.from(stringToEncode).toString("base64");
};

export default base64Encode;