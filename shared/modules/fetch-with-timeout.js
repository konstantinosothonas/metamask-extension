import { memoize } from 'lodash'

const getFetchWithTimeout = memoize((timeout = 30000) => {
  return async function _fetch(url, opts) {
    const abortController = new window.AbortController()
    const { signal } = abortController
    const f = window.fetch(url, {
      ...opts,
      signal,
    })

    const timer = setTimeout(() => abortController.abort(), timeout)

    try {
      const res = await f
      clearTimeout(timer)
      return res
    } catch (e) {
      clearTimeout(timer)
      throw e
    }
  }
})

export default getFetchWithTimeout