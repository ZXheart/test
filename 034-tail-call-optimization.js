// 1 1 2 3 5 8 13 21 34 55 89 144
function fibonacci(n) {
  if (n <= 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

function foo(n) {
  if (n <= 2) return 1

  let f = 1
  let s = 1
  for (let i = 3; i <= n; i++) {
    const t = f + s
    f = s
    s = t
  }
  return s
}

function bar(n) {
  if (n <= 2) return 1

  let a = 1,
    b = 1
  for (let i = 3; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

function fibo(n) {
  function fib(n, a, b) {
    if (n === 1) return a
    return fib(n - 1, b, a + b)
  }

  return fib(n, 1, 1)
}

function fibonacci1(n, a = 1, b = 1) {
  if (n === 1) {
    return a
  }
  return fibonacci(n - 1, b, a + b)
}

const t0 = globalThis.performance.now()

// console.log(foo(10))
console.log(bar(10))
// console.log(fibonacci(40)) // 55
// console.log(fibo(40)) // 55

const t1 = globalThis.performance.now()
console.log('函数执行了' + (t1 - t0) + '毫秒。')
