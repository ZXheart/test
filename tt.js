// #region 回调函数
function add(getx, gety, cb) {
  let x, y
  getx(resx => {
    x = resx
    if (y !== undefined) {
      cb(x + y)
    }
  })
  gety(resy => {
    y = resy
    if (x !== undefined) {
      console.log('333')
      cb(x + y)
    }
  })
}
function getX(fn) {
  setTimeout(() => {
    fn(55)
  }, 1000)
}
function getY(fn) {
  setTimeout(() => {
    fn(66)
  }, 2000)
}

// add(getX, getY, sum => {
//   console.log(sum)
// })
// #endregion

// #region promise
// async function add1(getX, getY) {
//   const [x, y] = await Promise.all([getX(), getY()])
//   return x + y
// }
function add1(getX, getY) {
  return Promise.all([getX(), getY()]).then(([x, y]) => x + y)
}

function getX1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(55)
    }, 100)
  })
}
function getY1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(66)
    }, 200)
  })
}

add1(getX1, getY1).then(sum => {
  console.log(sum)
})
// #endregion

function templateString(strings, ...expressions) {
  console.log(strings)
  console.log(expressions)
  return '123'
}
const name = 'julien'
const age = 18
templateString`i am ${name} and age is ${age}`

console.log`123`
