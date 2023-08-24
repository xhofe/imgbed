import { expect, test } from 'vitest'
import { createAsyncPool } from './async-pool'

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

test('async-pool', async (t) => {
  const pool = createAsyncPool(2)
  for (let i = 0; i < 10; i++) {
    pool(async () => {
      await sleep(100)
      console.log(i)
    })
  }
  await sleep(500)
})
