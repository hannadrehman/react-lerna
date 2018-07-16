const debounce = (delay, cb) => {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb();
      timer = null;
    }, delay);
  };
};

export { debounce }; //eslint-disable-line
