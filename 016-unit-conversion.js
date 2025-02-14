function kb2others(kb) {
  const unit = ['kb', 'mb', 'gb', 'tb', 'pb']
  let i = 0

  while (kb > 1024 && i < unit.length - 1) {
    kb /= 1024
    i++
  }

  return `${kb.toFixed(2)}${unit[i]}`
}
