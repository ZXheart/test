function foo() {
  const arr = [1, 2, 3]
  arr.forEach(item => {
    if (item < 2) {
      console.log('less than 2')
      return
    }
    console.log('index')
  })
}

function test() {
  console.log('111')
  foo()
  console.log('222')
}
test()

// implement forEach

Array.prototype._forEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this)
  }
}

Array.prototype._every = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (!cb(this[i], i, this)) {
      return false
    }
  }
  return true
}
