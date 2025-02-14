const worker = new Worker('worker.js')

worker.onmessage = e => {
  console.log(e.data)
}

document.getElementById('start').addEventListener('click', () => {
  const number = 40 // 计算斐波那契数列的第40个数
  worker.postMessage(number)
})
