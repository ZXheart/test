'use strict'

function _typeof(obj) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj
          }
        : function (obj) {
            return obj && 'function' == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }),
    _typeof(obj)
  )
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, 'string')
  return _typeof(key) === 'symbol' ? key : String(key)
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== 'object' || input === null) return input
  var prim = input[Symbol.toPrimitive]
  if (prim !== undefined) {
    var res = prim.call(input, hint || 'default')
    if (_typeof(res) !== 'object') return res
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (hint === 'string' ? String : Number)(input)
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet)
  privateSet.add(obj)
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap)
  privateMap.set(obj, value)
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError('Cannot initialize the same private elements twice on an object')
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError('attempted to get private field on non-instance')
  }
  return fn
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'set')
  _classApplyDescriptorSet(receiver, descriptor, value)
  return value
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value)
  } else {
    if (!descriptor.writable) {
      throw new TypeError('attempted to set read only private field')
    }
    descriptor.value = value
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, 'get')
  return _classApplyDescriptorGet(receiver, descriptor)
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError('attempted to ' + action + ' private field on non-instance')
  }
  return privateMap.get(receiver)
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver)
  }
  return descriptor.value
}
var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'
var _status = /*#__PURE__*/ new WeakMap()
var _value = /*#__PURE__*/ new WeakMap()
var _taskQueue = /*#__PURE__*/ new WeakMap()
var _changeStatus = /*#__PURE__*/ new WeakSet()
var _isThenable = /*#__PURE__*/ new WeakSet()
var _runMicroTask = /*#__PURE__*/ new WeakSet()
var _runTask = /*#__PURE__*/ new WeakSet()
var _runTaskQueue = /*#__PURE__*/ new WeakSet()
var ZPromise = /*#__PURE__*/ (function () {
  function ZPromise(executor) {
    var _this = this
    _classCallCheck(this, ZPromise)
    _classPrivateMethodInitSpec(this, _runTaskQueue)
    _classPrivateMethodInitSpec(this, _runTask)
    _classPrivateMethodInitSpec(this, _runMicroTask)
    _classPrivateMethodInitSpec(this, _isThenable)
    _classPrivateMethodInitSpec(this, _changeStatus)
    _classPrivateFieldInitSpec(this, _status, {
      writable: true,
      value: PENDING,
    })
    _classPrivateFieldInitSpec(this, _value, {
      writable: true,
      value: null,
    })
    _classPrivateFieldInitSpec(this, _taskQueue, {
      writable: true,
      value: [],
    })
    var _resolve = function _resolve(data) {
      _classPrivateMethodGet(_this, _changeStatus, _changeStatus2).call(_this, FULFILLED, data)
    }
    var _reject = function _reject(reason) {
      _classPrivateMethodGet(_this, _changeStatus, _changeStatus2).call(_this, REJECTED, reason)
    }
    try {
      executor(_resolve, _reject)
    } catch (error) {
      _reject(error)
    }
  }
  _createClass(ZPromise, [
    {
      key: 'then',
      value: function then(onFulfilled, onRejected) {
        var _this2 = this
        return new ZPromise(function (resolve, reject) {
          _classPrivateFieldGet(_this2, _taskQueue).push({
            onFulfilled: onFulfilled,
            onRejected: onRejected,
            resolve: resolve,
            reject: reject,
          })
          _classPrivateMethodGet(_this2, _runTaskQueue, _runTaskQueue2).call(_this2)
        })
      },
    },
  ])
  return ZPromise
})()
function _changeStatus2(status, data) {
  if (_classPrivateFieldGet(this, _status) !== PENDING) return
  _classPrivateFieldSet(this, _status, status)
  _classPrivateFieldSet(this, _value, data)
  _classPrivateMethodGet(this, _runTaskQueue, _runTaskQueue2).call(this)
}
function _isThenable2(value) {
  return !!value && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function'
}
function _runMicroTask2(fn) {
  if (
    (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' &&
    typeof process.nextTick === 'function'
  ) {
    process.nextTick(fn)
    return
  }
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn)
    return
  }
  setTimeout(fn, 0)
}
function _runTask2(callback, resolve, reject) {
  var _this3 = this
  _classPrivateMethodGet(this, _runMicroTask, _runMicroTask2).call(this, function () {
    if (typeof callback !== 'function') {
      return _classPrivateFieldGet(_this3, _status) === FULFILLED
        ? resolve(_classPrivateFieldGet(_this3, _value))
        : reject(_classPrivateFieldGet(_this3, _value))
    }
    try {
      var result = callback(_classPrivateFieldGet(_this3, _value))
      if (_classPrivateMethodGet(_this3, _isThenable, _isThenable2).call(_this3, result)) {
        result.then(
          function (data) {
            return resolve(data)
          },
          function (reason) {
            return reject(reason)
          }
        )
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  })
}
function _runTaskQueue2() {
  if (_classPrivateFieldGet(this, _status) !== PENDING) return
  while (_classPrivateFieldGet(this, _taskQueue).length) {
    var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _taskQueue).shift(),
      onFulfilled = _classPrivateFieldGet2.onFulfilled,
      onRejected = _classPrivateFieldGet2.onRejected,
      resolve = _classPrivateFieldGet2.resolve,
      reject = _classPrivateFieldGet2.reject
    _classPrivateMethodGet(this, _runTask, _runTask2).call(
      this,
      _classPrivateFieldGet(this, _status) === FULFILLED ? onFulfilled : onRejected,
      resolve,
      reject
    )
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

module.exports = ZPromise
