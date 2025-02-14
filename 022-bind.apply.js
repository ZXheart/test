function asyncify(fn) {
  var orig_fn = fn
  var intv = setTimeout(function () {
    intv = null
    if (fn) fn()
  }, 0)

  fn = null

  return function () {
    // 触发太快，在计时器`intv`触发指示异步转换发生之前?
    if (intv) {
      fn = orig_fn.bind.apply(
        orig_fn,
        // 将封装器的`this`加入`bind(..)`调用的参数
        // 同时柯里化(currying)其他所有的传入参数
        [this].concat([].slice.call(arguments))
      )
    }
    // 已经是异步
    else {
      // 调用原版的函数
      orig_fn.apply(this, arguments)
    }
  }
}

function result(data) {
  console.log(a)
}

var a = 0

ajax('http://some.url.1', asyncify(result))
a++
