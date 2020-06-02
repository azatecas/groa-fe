 export default function (callback, delay)  {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = null
        callback(...args)
      }, delay)
    }
  }