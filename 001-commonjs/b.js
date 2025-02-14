const a = require('./a')

console.log('1:', a)
console.log('2:', module.exports === exports && exports === this)

this.a = 1
exports.b = 2
exports = { c: 3 }
module.exports = { d: 4 }
exports.e = 5
this.f = 6

// exports === module.exports === this

// this = {
//   a: 1,
//   b: 2,
//   f: 6,
// }
// exports = {
//   c: 3,
//   e: 5,
// }
// module.exports = {
//   d: 4,
// }

console.log(this, exports, module.exports)
