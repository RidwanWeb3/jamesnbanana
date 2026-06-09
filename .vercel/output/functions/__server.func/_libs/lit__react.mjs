const e = /* @__PURE__ */ new Set(["children", "localName", "ref", "style", "className"]), t = ({ react: t2, tagName: n, elementClass: l, events: a, displayName: c }) => {
  const s = new Set(Object.keys(a ?? {})), o = t2.forwardRef(((a2, c2) => {
    t2.useRef(/* @__PURE__ */ new Map());
    const o2 = t2.useRef(null), r = {}, m = {};
    for (const [t3, n2] of Object.entries(a2)) e.has(t3) ? r["className" === t3 ? "class" : t3] = n2 : s.has(t3) || t3 in l.prototype ? m[t3] = n2 : r[t3] = n2;
    return ("litPatchedCreateElement" === t2.createElement.name || globalThis.litSsrReactEnabled) && Object.keys(m).length && (r._$litProps$ = m), t2.createElement(n, { ...r, ref: t2.useCallback(((e2) => {
      o2.current = e2, "function" == typeof c2 ? c2(e2) : null !== c2 && (c2.current = e2);
    }), [c2]) });
  }));
  return o.displayName = c ?? l.name, o;
};
export {
  t
};
