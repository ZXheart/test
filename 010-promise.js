const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function isThenable(value) {
  return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function'
}

class ZPromise {
  #status = PENDING
  #value = undefined
  #taskQueue = []

  #changeStatus(status, data) {
    if (this.#status !== PENDING) return
    this.#status = status
    this.#value = data

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
    } catch (error) {
      reject(error)
    }
  }

  #isObjFn(value) {
    return typeof value === 'function' || (typeof value === 'object' && value !== null)
  }

  #resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    if (x instanceof ZPromise) {
      return x.then(y => this.#resolvePromise(promise2, y, resolve, reject), reject)
    }

    let called = false
    if (this.#isObjFn(x)) {
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
      } catch (error) {
        if (called) return
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  #runMicroTask(fn) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(fn)
      return
    }
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(fn)
      return
    }
    setTimeout(fn, 0)
  }

  #runTask(callback, resolve, reject, promise2) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        return this.#status === FULFILLED ? resolve(this.#value) : reject(this.#value)
      }

      try {
        const x = callback(this.#value)
        this.#resolvePromise(promise2, x, resolve, reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  #runTaskQueue() {
    if (this.#status === PENDING) return

    while (this.#taskQueue.length) {
      const { onFulfilled, onRejected, resolve, reject, promise2 } = this.#taskQueue.shift()

      this.#runTask(this.#status === FULFILLED ? onFulfilled : onRejected, resolve, reject, promise2)
    }

    // const tasks = [...this.#taskQueue]
    // this.#taskQueue = []

    // tasks.forEach(({ onFulfilled, onRejected, resolve, reject, promise2 }) => {
    //   this.#runTask(this.#status === FULFILLED ? onFulfilled : onRejected, resolve, reject, promise2)
    // })
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
}

ZPromise.deferred = function () {
  const dfd = {}
  dfd.promise = new ZPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

const pr = new ZPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})

const res = pr.then(
  data => {
    console.log(data)
    return { a: 888 }
  },
  reason => {
    console.log(reason)
  }
)

res.then(
  data => {
    console.log(data)
  },
  reason => {
    console.log(reason)
  }
)

module.exports = ZPromise
