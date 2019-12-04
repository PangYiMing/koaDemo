module.exports = {
    process() {
      return `module.exports = '<svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor" />'`;
    },
    getCacheKey() {
      // The output is always the same.
      return 'svgTransform';
    },
  };