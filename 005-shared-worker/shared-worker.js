// self.addEventListener('connect', evt => {
//   const port = evt.ports[0]
//   port.start()
//   port.addEventListener('message', e => {
//     console.log('5566', e, evt.ports)
//     const msg = e.data + ' 已加工'
//     port.postMessage(msg)
//   })
// })

onconnect = function (e) {
  var port = e.ports[0]

  port.addEventListener('message', function (e) {
    const msg = e.data + ' 已加工'
    port.postMessage(msg)
  })

  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}
