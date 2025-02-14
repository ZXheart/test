// #region callback version
function callbackAdd(getX, getY, cb) {
  let x, y
  getX(resX => {
    x = resX
    if (y !== undefined) {
      cb(x + y)
    }
  })

  getY(resY => {
    y = resY
    if (x !== undefined) {
      cb(x + y)
    }
  })
}

function getX(fn) {
  setTimeout(() => {
    fn(20)
  }, 1000)
}
function getY(fn) {
  setTimeout(() => {
    fn(30)
  }, 2000)
}

// callbackAdd(getX, getY, sum => {
//   console.log(sum)
// })

// #endregion

// #region promise version
function promiseAdd(getX, getY) {
  return Promise.all([getX(), getY()]).then(([x, y]) => x + y)
}

function getX1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(20)
    }, 1000)
  })
}

function getY1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(30)
    }, 2000)
  })
}

promiseAdd(getX1, getY1).then(sum => {
  console.log(sum)
})

// #endregion
