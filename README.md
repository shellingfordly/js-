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

2. this指向问题

- funciton 默认跳用this指向window

```js
function fn(e) {
    this.name = 'fn'

    function son() {
      console.log('function son this: ', this)
    }

    e(son)
  }

  new fn(function (son) {
    son()
})

// 结果：function son this:  Window
```

- class的方法属性简写形式为function声明

```js
class Fn {
    constructor(e) {
      this.name = 'Fn'

      e(this.son)
    }

    son() {
      console.log('class son this: ', this)
    }
  }

  new Fn((son) => {
    son()
})

// class son this:  undefined
```


## 定时器

1. 定时器真的是定时执行的吗
    - 定时器并不能保证真正的定时执行
    - 一般会延迟一点点，是可以接受的范围
    - 也有可能会延迟很长的时间，不可以接受（
      - 为什么会延迟很长时间?
        - 等待同步代码执行

2. 定时器是在主线程中执行的吗
    - 是的，js是单线程的


```js
const start = Data.now()
setTimeout(() => {
  console.log(Date.now() - start)
})
// 没有 for 循环，延迟较小，可以接受

// for循环很大时，延迟将毕竟大
for (let index = 0; index < 10000000000; index++) {
}

```
3. alert
    - 暂停当前主线程的执行，同时会暂停定时器
    - 点击确定后，才会恢复程序的执行，和定时器