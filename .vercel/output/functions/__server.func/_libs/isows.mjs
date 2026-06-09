import "events";
import "https";
import "http";
import "net";
import "tls";
import "crypto";
import "stream";
import "url";
import "zlib";
import "fs";
import "path";
import "os";
import "buffer";
import "util";
import { r as requireWs } from "./ws.mjs";
import { c as commonjsGlobal } from "./react.mjs";
var _cjs = {};
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.getNativeWebSocket = void 0;
  function getNativeWebSocket() {
    if (typeof WebSocket !== "undefined")
      return WebSocket;
    if (typeof commonjsGlobal.WebSocket !== "undefined")
      return commonjsGlobal.WebSocket;
    if (typeof window.WebSocket !== "undefined")
      return window.WebSocket;
    if (typeof self.WebSocket !== "undefined")
      return self.WebSocket;
    throw new Error("`WebSocket` is not supported in this environment");
  }
  utils.getNativeWebSocket = getNativeWebSocket;
  return utils;
}
var hasRequired_cjs;
function require_cjs() {
  if (hasRequired_cjs) return _cjs;
  hasRequired_cjs = 1;
  Object.defineProperty(_cjs, "__esModule", { value: true });
  _cjs.WebSocket = void 0;
  const WebSocket_ = requireWs();
  const utils_js_1 = requireUtils();
  _cjs.WebSocket = (() => {
    try {
      return (0, utils_js_1.getNativeWebSocket)();
    } catch {
      if (WebSocket_.WebSocket)
        return WebSocket_.WebSocket;
      return WebSocket_;
    }
  })();
  return _cjs;
}
export {
  require_cjs as r
};
