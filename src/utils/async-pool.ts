export function createAsyncPool(max: number) {
  const queue: (() => Promise<void>)[] = []
  let active = 0
  const next = () => {
    if (active < max && queue.length) {
      active++
      queue.shift()!().then(() => {
        active--
        next()
      })
    }
  }
  return (fn: () => Promise<void>) => {
    queue.push(fn)
    next()
  }
}
