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
        const then = x.then
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
      const settled = this.#status === FULFILLED ? onFulfilled : onRejected

      this.#runMicroTask(() => {
        if (typeof settled === 'function') {
          try {
            const x = settled(this.#value)
            this.#resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          this.#status === FULFILLED ? resolve(this.#value) : reject(this.#value)
        }
      })
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

  #runMicroTask(fn) {
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(fn)
    } else if (typeof process === 'object' && process.nextTick) {
      process.nextTick(fn)
    } else if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(fn)
      observer.observe(document.body, { attributes: true })
      document.body.setAttribute('kk', 'kk')
    } else {
      setTimeout(fn, 0)
    }
  }
}

const p = new ZPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})

p.then(
  data => {
    console.log(data)
  },
  e => {
    console.log(e)
  }
)

ZPromise.deferred = function () {
  const dfd = {}
  dfd.promise = new ZPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = ZPromise
