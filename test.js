// 1. 有趣的现象，如果是resolve一个promise，该promise会被展开为一个普通值。
// 如果reject一个promise，该promise则会原封不动的传递下去。
const p = Promise.resolve(1)
const resP = Promise.resolve(p)
// const rejP = Promise.reject(p)

resP.then(
  d => {
    console.log('d', d)
  },
  e => {
    console.log('e', e)
  }
)

// 测试resolve的是一个thenable而不是promise，看是否会被展开
const obj = {
  then(rs, rj) {
    rs('thenable')
  },
}

const p2 = Promise.resolve(obj)
p2.then(
  d => {
    console.log('d', d)
  },
  e => {
    console.log('e', e)
  }
)

// 2. 如果使用new Promise()，则resolve的是一个promise，那么该promise会被展开为一个普通值。
// 如果使用静态方法Promise.resolve()，则resolve的是一个promise，那么该promise会被直接传递下去。
// 还真TM奇怪哎
const pr1 = new Promise(resolve => {
  resolve(2)
})
const pr2 = new Promise(resolve => {
  resolve(pr1)
})
console.log(pr1 === pr2) // false

const pr3 = Promise.resolve(2)
const pr4 = Promise.resolve(pr3)
console.log(pr3 === pr4) // true

// --------------------------------------------

let nextVal
const it = {
  [Symbol.iterator]() {
    return this
  },
  next() {
    if (nextVal === undefined) {
      nextVal = 1
    } else {
      nextVal = 3 * nextVal + 6
    }
    return { done: false, value: nextVal }
  },
}

for (const v of it) {
  console.log(v)
  if (v > 500) {
    break
  }
}

// --------------------------------------------

function* something() {
  try {
    var nextVal

    while (true) {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = 3 * nextVal + 6
      }
      yield nextVal
    }
  } finally {
    // 清理子句
    console.log('cleaning up!')
  }
}

var it1 = something()

for (var v of it1) {
  console.log('something:', v)

  // 不要死循环！
  if (v > 500) {
    console.log(
      // 完成生成器的迭代器
      it1.return('hello world')
    )
    // 这里不需要 break
  }
}
