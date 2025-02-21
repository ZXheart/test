function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(44)
    }, 1000)
  })
}

function* main() {
  try {
    var x = yield foo()
    console.log('x:', x)
  } catch (error) {
    console.log('inner catch:', error)
  }
}

function runGen(gen) {
  const args = Array.prototype.slice.call(arguments, 1)
  const it = gen.apply(this, args)

  return Promise.resolve().then(function handleNext(val) {
    const next = it.next(val)

    return (function handleRes(next) {
      if (next.done) {
        return next.value
      } else {
        return Promise.resolve(next.value).then(handleNext, function handleErr(e) {
          return Promise.resolve(it.throw(e)).then(handleRes)
        })
      }
    })(next)
  })
}

function bar() {
  return Promise.resolve().then(res => {
    return 44
  })
}
const res = bar()
console.log(res)
res.then(res => {
  console.log(res)
})
