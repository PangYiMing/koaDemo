// console.log(require('./j'));
// console.log(aaa);
const get = require('./demo24')

async function main() {
  const res = await get()
  console.log('main res', res);
}
main()