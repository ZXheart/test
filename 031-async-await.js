// async function asy1() {
//   console.log(1)
//   await asy2()
//   console.log(2)
// }

// asy2 = async () => {
//   await setTimeout(_ => {
//     Promise.resolve().then(_ => {
//       console.log(3)
//     })
//     console.log(4)
//   }, 0)
// }

// asy3 = async () => {
//   Promise.resolve().then(() => {
//     console.log(6)
//   })
// }
// asy1()
// console.log(7)
// asy3()

//2.

// function* main() {
//   try {
//     var x = yield 'hello world'
//   } catch (error) {
//     console.log('inner catch:', error)
//   }

//   // 永远不会到达这里
//   console.log(x)
// }

// var it = main()

// it.next()

// try {
//   // *main()会处理这个错误吗？看看吧？
//   it.throw('Oops')
// } catch (e) {
//   // 不行，没有处理！
//   console.error('catch:', e) // Oops
// }

// 3.

function* bar() {
  yield* [4, 5]
  return 6
}

function* foo() {
  var x = yield 3
  var y = yield* bar()
  console.log(x, y)
}

var it = foo()
console.log(it.next()) // { value: 3, done: false }
console.log(it.next(66)) // { value: 4, done: false }
console.log(it.next()) // { value: 5, done: false }
console.log(it.next()) // 66 6 { value: undefined, done: true }
