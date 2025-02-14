const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class ZPromise {
  #status = PENDING
  #value = undefined
  #taskQueue = []

  #changeStatus(status, value) {
    if (this.#status !== PENDING) return
    this.#status = status
    this.#value = value

    this.#runTaskQueue()
  }

  #resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof ZPromise) {
      return x.then(y => this.#resolvePromise(promise2, y, resolve, reject), reject)
    }

    let called = false
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              this.#resolvePromise(promise2, y, resolve, reject)
            },
            r => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } else {
          resolve(x)
        }
      } catch (e) {
        if (called) return
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  #runTaskQueue() {
    if (this.#status === PENDING) return

    while (this.#taskQueue.length) {
      const { onFulfilled, onRejected, resolve, reject, promise2 } = this.#taskQueue.shift()
      let fn = this.#status === FULFILLED ? onFulfilled : onRejected

      this.#runMicroTask(() => {
        if (typeof fn !== 'function') {
          this.#status === FULFILLED ? resolve(this.#value) : reject(this.#value)
        } else {
          try {
            const x = fn(this.#value)
            this.#resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }
      })
    }
  }

  constructor(executor) {
    const resolve = data => {
      this.#changeStatus(FULFILLED, data)
    }
    const reject = reason => {
      this.#changeStatus(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new ZPromise((resolve, reject) => {
      this.#runMicroTask(() => {
        this.#taskQueue.push({ onFulfilled, onRejected, resolve, reject, promise2 })
        this.#runTaskQueue()
      })
    })
    return promise2
  }

  // utils
  #runMicroTask(fn) {
    if (typeof queueMicrotask === 'function') {
      return queueMicrotask(fn)
    }

    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      return process.nextTick(fn)
    }

    if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(fn)

      const textNode = document.createTextNode('1')
      observer.observe(textNode)
      textNode.data = '2'
    } else {
      setTimeout(fn, 0)
    }
  }
}

const promise = new ZPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

promise.then(
  data => {
    console.log(data)
    return 'success2'
  },
  reason => {
    console.log(reason)
  }
)

ZPromise.deferred = function () {
  const defer = {}
  defer.promise = new ZPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

module.exports = ZPromise
