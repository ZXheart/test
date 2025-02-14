function foo(x) {
  const eventMap = new Map()

  const listener = {
    emit(type, payload) {
      if (type === 'completion') {
        let handlers = eventMap.get('completion') || []
        handlers.forEach(handler => handler(payload))
        eventMap.set('completion', [])
      }
      if (type === 'error') {
        let handlers = eventMap.get('error') || []
        handlers.forEach(handler => handler(payload))
        eventMap.set('error', [])
      }
    },
    on(type, cb) {
      if (type === 'completion') {
        let handlers = eventMap.get('completion') || []
        handlers.push(cb)
        eventMap.set('completion', handlers)
      }
      if (type === 'error') {
        let handlers = eventMap.get('error') || []
        handlers.push(cb)
        eventMap.set('error', handlers)
      }
    },
  }
  // 经过一些费事操作，计算数据，最后返回监听器
  setTimeout(() => {
    if (Math.random() > 0.5) {
      listener.emit('completion', x * 2)
    } else {
      listener.emit('error', new Error('Failed to double the number'))
    }
  }, 0)

  return listener
}

const evt = foo(42)

evt.on('completion', res => {
  console.log('completion :', res)
})

evt.on('error', e => {
  console.log('error :', e)
})
