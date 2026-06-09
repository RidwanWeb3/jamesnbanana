function pipe(init, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), init);
}
export {
  pipe as p
};
