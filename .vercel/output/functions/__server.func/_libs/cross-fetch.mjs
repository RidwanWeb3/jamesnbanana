import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as require$$0 } from "./node-fetch.mjs";
var nodePonyfill = { exports: {} };
var hasRequiredNodePonyfill;
function requireNodePonyfill() {
  if (hasRequiredNodePonyfill) return nodePonyfill.exports;
  hasRequiredNodePonyfill = 1;
  (function(module, exports) {
    const nodeFetch = require$$0;
    const realFetch = nodeFetch.default || nodeFetch;
    const fetch = function(url, options) {
      if (/^\/\//.test(url)) {
        url = "https:" + url;
      }
      return realFetch.call(this, url, options);
    };
    fetch.ponyfill = true;
    module.exports = exports = fetch;
    exports.fetch = fetch;
    exports.Headers = nodeFetch.Headers;
    exports.Request = nodeFetch.Request;
    exports.Response = nodeFetch.Response;
    exports.default = fetch;
  })(nodePonyfill, nodePonyfill.exports);
  return nodePonyfill.exports;
}
var nodePonyfillExports = requireNodePonyfill();
const o = /* @__PURE__ */ getDefaultExportFromCjs(nodePonyfillExports);
export {
  o
};
