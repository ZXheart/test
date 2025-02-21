// 1. 生成器函数
// function* foo(x) {
//   var y = x * (yield)
//   return y
// }

// const it = foo(6)

// console.log(it.next())
// console.log(it.next(6))
// console.log(it.next())

// 2.
// function something() {
//   let nextVal

//   return {
//     [Symbol.iterator]: function () {
//       return this
//     },
//     next() {
//       if (nextVal === undefined) {
//         nextVal = 1
//       } else {
//         nextVal = 3 * nextVal + 6
//       }
//       return { done: false, value: nextVal }
//     },
//   }
// }
// const it = something()

// let ret
// for (; (ret = it.next()) && !ret.done; ) {
//   console.log(ret.value)
//   if (ret.value > 500) {
//     break
//   }
// }

// 3.
// function* foo() {
//   let nextVal
//   for (;;) {
//     if (nextVal === undefined) {
//       nextVal = 1
//     } else {
//       nextVal = 3 * nextVal + 6
//     }
//     yield nextVal
//   }
// }

// const it = foo()

// for (const v of it) {
//   console.log(v)
//   if (v > 500) {
//     break
//   }
// }

// 4.
function* stop() {
  try {
    let nextVal
    for (;;) {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = 3 * nextVal + 6
      }
      yield nextVal
    }
  } finally {
    console.log('cleaning up!')
  }
}

const it = stop()
for (const v of it) {
  console.log(v)
  if (v > 500) {
    // const res = it.return('done early')
    const res = it.next('done early')
    console.log('res:', res)
    break
  }
}
