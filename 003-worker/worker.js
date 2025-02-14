self.onmessage = e => {
  const number = e.data // 获取主线程发送的数据
  const res = fibonacci(number) // 计算斐波那契数列
  self.postMessage(res) // 将结果发送给主线程
}

/**
 * 计算第n个斐波那契数列的值
 * 斐波那契数列 形如：1,1,2,3,5,8,13,21,34,55,89,144...
 * @param {number} n
 * @returns {number}
 */

function fibonacci(n) {
  if (n <= 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}
