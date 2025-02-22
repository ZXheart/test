function* foo() {
  // try {
  yield 'B'
  // } catch (e) {
  //   console.log('inside *foo() caught:', e)
  // }

  yield 'C'

  throw 'D'
}

function* bar() {
  yield 'A'

  try {
    yield* foo()
  } catch (e) {
    console.log('inside *bar() caught:', e)
  }

  yield 'E'

  yield* baz()

  yield 'G'
}

function* baz() {
  throw 'F'
}

const it = bar()

console.log('outside:', it.next().value)
// outside: A

console.log('outside:', it.next(1).value)
// B

console.log('outside-:', it.throw(2).value)
// inside *foo() caught: 2
// outside: C

// console.log('outside:', it.next(3).value)
// inside *bar() caught: D
// outside: E

try {
  console.log('outside:', it.next(3).value)
} catch (e) {
  console.log('outside caught-:', e)
}

try {
  console.log('outside:', it.next(4).value)
} catch (e) {
  console.log('outside caught:', e)
  // outside caught: F
}
