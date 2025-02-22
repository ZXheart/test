function delay(time, val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val)
    }, time)
  })
}

function* foo() {
  const r2P = yield delay(1000, 'res2')
  const r3P = yield delay(500, 'res3')

  return [r2P, r3P]
}

function* bar() {
  const r1 = yield delay(1000, 'res1')

  const res = yield* foo()
  console.log('res:', r1, res) // res: res1 [ 'res2', 'res3' ]
}

const it = bar()

const p0 = it.next().value

p0.then(res => {
  const p1 = it.next(res).value
  p1.then(res => {
    const p2 = it.next(res).value
    p2.then(res => {
      it.next(res)
    })
  })
})
