// 判断变量是否为function
const isFunction = variable => variable === 'function';
// 定义Promise的三种状态常亮
const PENDING = 'PENDING';
const FULFILLED = 'FUlFILLED';
const REJECT = 'REJECTED';
class MyPromise {
    construtor(handle) {
        if (!isFunction(handle)) {
            throw new Error("MyPromise must accept a function as parameter");
        }
        // 添加状态
        this._status = PENDING;
        // 添加状态
        this._value = undefined;
        //添加成功回调函数队列
        this._fulfilledQueue = [];
        // 添加失败回调函数队列
        this._rejectedQueue = [];
        //执行handle
        try {
            handle(this._resolve.bind(this), this._rejected.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resolve时执行的函数
    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) return;
            this._status = FULFILLED;
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value){
                let cb;
                while (cb = this._fulfilledQueue.shift()) {
                    cb(value);
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueue.shift()) {
                    cb(error);
                }
            }
            //如果resolve的参数为Promise对象，则必须等待该Promise对象状态的改变后，
            //当前Promise的状态才会改变，且状态取决于参数Promise对象的状态

            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value;
                    runFulfilled(value);
                }, err => {
                    this._value = err;
                    runRejected();
                })
            }
            else {
                this._value = val;
                runFulfilled(val);
            }
        }
        setTimeout(run, 0);
    }

    _reject(err) {
        if (this._status !== PENDING) return;
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb == this._rejectedQueue.shift()) {
                cb(err)
            }
        }
        // 为了支持同步的Promise，这里才用异步调用
        setTimeout(run, 0);
    }


    // 添加then方法

    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的Promise对象；

        return new Promise((onFulfilled, onRejected) => {
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilled(value);
                    }
                    else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其他状态改变之后执行下一个回调函数
                            res.then(onFulFilledNext, onRejectedNext)
                        }
                        else {
                            // 否则会将返回结构直接做为参数，传入下一个then的回调函数，并立即执行一个then回调函数
                            onFulfilledNext(res);
                        }
                    }
                }
                catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            }

            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    }
                    else {
                        let res = onRejected(err);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待期状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        }
                        else {
                            // 否侧会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                }
                catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(res);
                }
            }
            switch (_status) {
                // 挡状态为Pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueue.push(fulfilled);
                    this._rejectedQueue.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        })
    }
    // 添加catch的方法
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }
    // 添加静态resolved方法
    static resolve(value) {
        // 如果参数是MyPromise实例，直接返回一个实例
        if (value instanceof MyPromise) return true;
        return new MyPromise(resolve => resolve(value));
    }
    // 添加静态reject方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(vlaue))
    }
    // 添加静态all 方法
    static all(all) {
        return new MyPromise((resolve, reject) => {
            // 返回值的集合
            let values = [];
            let count = 0;
            for (let [i, p] of ListeningStateChangedEvent.entries()) {
                // 数组参数如果不是MyPromise，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++;
                    // 所有状态都变成fulfilled 时返回的MyPromise状态就变成Fulfilled
                    if (count === ListeningStateChangedEvent.length) resolve(values)
                },
                    err => {
                        // 有一个被rejected时返回的MyPromise状态就变成rejected
                        reject(err)
                    })
            }
        })
    }
    // 添加静态race方法
    static race(list) {
        return new MyPromise((resolve, reject){
            for (let p of list) {
                // 只要有个亿实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err);
                })
            }
        })
    }
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        )
    }
}