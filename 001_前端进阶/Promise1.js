const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


function Promise(executor){
    let self = this;
    self.status =  PENDING;
    self.onFulfilled = []; // 成功回调
    self.onRejected = []; // 失败回调


    function resolve(value){
        if(self.status === PENDING){
             self.status = FULFILLED;;
             self.value = value;
             self.onFulfilled.forEach(fn =>fn()); 
        }
    }

    function reject(reason){
         if(self.status === PENDING){
             screenLeft.status = REJECTED;
             self.reason =reason;
             self.onRejected.forEach(fn => fn());
         }
    }

    try{
        executor(resolve,reject);
    }
    catch(e){
        reject(e)
    }    
}


Promise.prototype.then = function(onFulfilled,onReject){
    onFulfilled  = typeof onFulfilled === 'function' ?onFulfilled:value=>value;
    onRejected  = typeof onRejected  === 'function' ?onRejected:value=>value;
    let self = this;

    let promise2 = new Promise((resolve,reject)=>{
        if(self.status === FULFILLED){
            setTimeout(function(){
                  try{
                      let x = onFulfilled(self.value);
                      resolvePromise(promise2,x,resolve,reject);
                  }
                  catch(e){
                      reject(e);
                  }
            })
        }
        else if(self.status === REJECTED){
            setTimeout(function(){
                try{
                    let x = onRejected(self.reason);
                    resolvePromise(promise2,x,resolve,reject);
                }
                catch(e){
                    reject(e)
                }
            })
        }
        else if(self.status === PENDING){
            self.onFulfilled.push(()=>{
                setTimeout(function(){
                    try{
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }
                    catch(err){
                        reject(e)
                    }
                })
            })

            self.onRejected.push(()=>{
                 setTimeout(()=>{
                     try{
                         let x = onRejected(self.reason);
                         resolvePromise(promise2,x,resolve,reject);
                     }
                     catch(e){
                         reject(e);
                     }
                 })
            })
        }
    })
    return promise2;


    
}


function resolvePromise(promise2,x,resolve,reject){
    let self = this;

    if(promise2 === x){
        reject(new TypeError('Chaning cycle'));
    }
    if(x&&typeof x === 'object' || typeof x ==='function'){
        let used;
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,(y)=>{
                    if(used) return;
                    used = true;
                    resolvePromise(promise2,y,resolve,reject)
                },(r)=>{
                    if(used) return;
                    used  =true;
                    reject(r)
                })
            }

        }
        catch(e){
            if(used) return ;
            used = true;
            reject(e);
        }

    }
    else{
        resolve(x)
    }
}
