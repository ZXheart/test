function foo() {
  console.log('立马执行')
  setTimeout(() => {
    const rand = Math.random()
    if (rand > 0.5) {
      it.throw('Oops!')
    } else {
      const r = it.next(rand)
      console.log('r:', r)
    }
  }, 1000)
}

function* main() {
  try {
    const text = yield foo()
    console.log('text:', text)
  } catch (err) {
    console.error('err:', err)
  }
}

const it = main()

const res = it.next()
console.log('res:', res)
