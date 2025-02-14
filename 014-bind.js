Function.prototype._bind = function (thisArg, args) {
  thisArg = thisArg || globalThis

  const key = Symbol('key')
  thisArg[key] = this

  let res = undefined
  res = thisArg[key](...args)
  delete thisArg[key]

  return res
}
