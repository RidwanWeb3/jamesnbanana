import { r as requireCjs$1 } from "./walletconnect__window-getters.mjs";
var cjs = {};
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  Object.defineProperty(cjs, "__esModule", { value: true });
  cjs.getWindowMetadata = void 0;
  const window_getters_1 = requireCjs$1();
  function getWindowMetadata() {
    let doc;
    let loc;
    try {
      doc = window_getters_1.getDocumentOrThrow();
      loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
      return null;
    }
    function getIcons() {
      const links = doc.getElementsByTagName("link");
      const icons2 = [];
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const rel = link.getAttribute("rel");
        if (rel) {
          if (rel.toLowerCase().indexOf("icon") > -1) {
            const href = link.getAttribute("href");
            if (href) {
              if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                let absoluteHref = loc.protocol + "//" + loc.host;
                if (href.indexOf("/") === 0) {
                  absoluteHref += href;
                } else {
                  const path = loc.pathname.split("/");
                  path.pop();
                  const finalPath = path.join("/");
                  absoluteHref += finalPath + "/" + href;
                }
                icons2.push(absoluteHref);
              } else if (href.indexOf("//") === 0) {
                const absoluteUrl = loc.protocol + href;
                icons2.push(absoluteUrl);
              } else {
                icons2.push(href);
              }
            }
          }
        }
      }
      return icons2;
    }
    function getWindowMetadataOfAny(...args) {
      const metaTags = doc.getElementsByTagName("meta");
      for (let i = 0; i < metaTags.length; i++) {
        const tag = metaTags[i];
        const attributes = ["itemprop", "property", "name"].map((target) => tag.getAttribute(target)).filter((attr) => {
          if (attr) {
            return args.includes(attr);
          }
          return false;
        });
        if (attributes.length && attributes) {
          const content = tag.getAttribute("content");
          if (content) {
            return content;
          }
        }
      }
      return "";
    }
    function getName() {
      let name2 = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
      if (!name2) {
        name2 = doc.title;
      }
      return name2;
    }
    function getDescription() {
      const description2 = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
      return description2;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
      description,
      url,
      icons,
      name
    };
    return meta;
  }
  cjs.getWindowMetadata = getWindowMetadata;
  return cjs;
}
export {
  requireCjs as r
};
