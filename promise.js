function Promise(executor) {

  this.promiseState = 'pending'
  this.promiseResult = undefined

  function resolve(data) {
    this.promiseState = 'fulfilled'
    this.promiseResult = data
  }

  function reject(err) {
    this.promiseState = 'rejected'
    this.promiseResult = err | new Error('rejected')
  }

  executor(resolve, reject)
}

const p = new Promise((resolve, reject) => {
  resolve('OK')
})

console.log(p)