const promisesAplusTests = require('promises-aplus-tests')
// const ZPromise = require('./010-promise')
const HYPromise = require('./012-hy-promise')
// const ZPromise = require('./013-pppromise')
// const ZPromise = require('./015-promises')
const ZPromise = require('./020-promise-2')

promisesAplusTests(ZPromise, function (err) {
  if (err) {
    console.log('reason:', err)
  } else {
    console.log('done')
  }
})
