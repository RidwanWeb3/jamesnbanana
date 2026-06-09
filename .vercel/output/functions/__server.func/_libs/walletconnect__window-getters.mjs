var cjs = {};
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  Object.defineProperty(cjs, "__esModule", { value: true });
  cjs.getLocalStorage = cjs.getLocalStorageOrThrow = cjs.getCrypto = cjs.getCryptoOrThrow = cjs.getLocation = cjs.getLocationOrThrow = cjs.getNavigator = cjs.getNavigatorOrThrow = cjs.getDocument = cjs.getDocumentOrThrow = cjs.getFromWindowOrThrow = cjs.getFromWindow = void 0;
  function getFromWindow(name) {
    let res = void 0;
    if (typeof window !== "undefined" && typeof window[name] !== "undefined") {
      res = window[name];
    }
    return res;
  }
  cjs.getFromWindow = getFromWindow;
  function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) {
      throw new Error(`${name} is not defined in Window`);
    }
    return res;
  }
  cjs.getFromWindowOrThrow = getFromWindowOrThrow;
  function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
  }
  cjs.getDocumentOrThrow = getDocumentOrThrow;
  function getDocument() {
    return getFromWindow("document");
  }
  cjs.getDocument = getDocument;
  function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
  }
  cjs.getNavigatorOrThrow = getNavigatorOrThrow;
  function getNavigator() {
    return getFromWindow("navigator");
  }
  cjs.getNavigator = getNavigator;
  function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
  }
  cjs.getLocationOrThrow = getLocationOrThrow;
  function getLocation() {
    return getFromWindow("location");
  }
  cjs.getLocation = getLocation;
  function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
  }
  cjs.getCryptoOrThrow = getCryptoOrThrow;
  function getCrypto() {
    return getFromWindow("crypto");
  }
  cjs.getCrypto = getCrypto;
  function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
  }
  cjs.getLocalStorageOrThrow = getLocalStorageOrThrow;
  function getLocalStorage() {
    return getFromWindow("localStorage");
  }
  cjs.getLocalStorage = getLocalStorage;
  return cjs;
}
export {
  requireCjs as r
};
