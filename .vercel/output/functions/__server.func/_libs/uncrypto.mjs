import nc__default from "node:crypto";
const subtle = nc__default.webcrypto?.subtle || {};
const getRandomValues = (array) => {
  return nc__default.webcrypto.getRandomValues(array);
};
export {
  getRandomValues as g,
  subtle as s
};
