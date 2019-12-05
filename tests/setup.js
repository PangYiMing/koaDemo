// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
// global.requestAnimationFrame = cb => setTimeout(cb, 0);
// global.cancelAnimationFrame = cb => clearTimeout(cb, 0);

global.Enzyme = require('enzyme');

const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
