一些关于js的学习文件


## Promise

1. 多个then
  - promise的多个then回调函数在状态发生改变之后都会执行，执行顺序取决于书写顺序


2. 改变状态和then的执行顺序
    - 同步改变状态时，先改变状态后执行then函数指定回调，并且立即执行回调函数
    - 异步改变状态时，先执行then指定回调，再异步改变状态，之后执行then的回调函数

3. promise.then()返回的新promise状态
    - 由then指定的回调函数return的结果决定新promise的状态
    - 返回值
      - 返回非promise对象，则新promise状态为fulfilled，结果为此对象
      - 返回promise对象，新promise的状态取决于返回的状态成功与否

4. 异常穿透
  - 使用then链式调用时，不需要每个then的回调都做错误处理，只需要在最后指定失败回调即可，上面的所有位置的发生的第一次错误都会直接进入错误回调函数中

5. 中断then链式调用
  - 返回一个pending状态的promise





### 问题

1. 当有好几个异步函数需要等待处理，等到所有异步函数处理完毕之后拿到所有的数据再返回，怎么做到。

```js
Promise.all = function (promiseList) {
    const len = promiseList.length
    return new Promise((resolve, reject) => {
      const resultList = []
      let count = 0
      for (let i = 0; i < len; i++) {
        const promise = promiseList[i];
        promise.then(value => {
          count++
          resultList[i] = value
          // 此处如果直接使用 resultList 的长度做判断会有问题
          if (count === len) {
            resolve(resultList)
          }
        }, err => {
          reject(err)
        })
      }
    })
  }
```
