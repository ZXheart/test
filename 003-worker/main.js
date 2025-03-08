document.getElementById('start').addEventListener('click', () => {
  const worker = new Worker('./worker.js')
  console.log('start')
  const number = 40
  worker.postMessage(number)

  worker.onmessage = e => {
    console.log(e.data)
  }
})

// const worker = new Worker(
//   URL.createObjectURL(
//     new Blob(
//       [
//         `
//   self.onmessage = () => {
//     self.postMessage(performance.now());
//   };
// `,
//       ],
//       { type: 'application/javascript' }
//     )
//   )
// )

// function delay(ms) {
//   const start = Date.now()
//   while (Date.now() - start < ms) {}
// }

// document.getElementById('start').addEventListener('click', () => {
//   console.log(`Start time: ${performance.now().toFixed(2)} ms`)

//   worker.postMessage('start')

//   worker.onmessage = e => {
//     console.log(`Worker executed at: ${e.data.toFixed(2)} ms`)
//   }

//   setTimeout(() => {
//     console.log(`setTimeout executed at: ${performance.now().toFixed(2)} ms`)
//   }, 0)

//   delay(500) // 让 Worker 计算结果在主线程阻塞期间完成
// })
