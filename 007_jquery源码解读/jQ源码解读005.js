JQuery源码解读



JQ的一些扩展工具方法（ 妙味讲堂 - 视频笔记 - 第五部分）
 



// 延迟函数
$.Deferred();

$.when();


// 依赖回调函数实现
$.Callbacks();

jQuery.extend({
    Deferred: function() {

    },
    when: function() {

    }
})


setTimeout(function() {
    alert(111);

}, 1000)

alert(2222)


// 222->111  
// setTimeout  异步函数后面执行




var cb = $.Callbacks();

setTimeout(function() {
    alert(111);
    cb.fire();
}, 1000)


cb.add(function() {
    alert(2222)
})

// 111->222


var dfd = $.Deferred();

setTimeout(function() {
    alert(111);
    dfd.resolve();
    //    dfd.reject();
    //    dfd.notify();

}, 1000)



dfd.done(function() {
    alert(222)
})

// dfd.progress(function () {
//     alert(222)
// })


// dfd.fail(function () {
//     alert(222)
// })



// 111->222
// add->done,fail 追加
// fire->resolve 完成,reject失败,progress进行时  执行





// 基本回调
$.ajax({
    url: "",
    success: function(res) {

    },
    error: function(err) {

    }
})


$.ajax("url").done(function() {
    //   resolve
}).fail(function() {
    // reject
})



Deferred: function(func) {
    var tuples = [
            // action, add listener, listener list, final state
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
        ],
        state = "pending",
        promise = {
            state: function() {
                return state;
            },
            always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
            },
            then: function( /* fnDone, fnFail, fnProgress */ ) {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                    jQuery.each(tuples, function(i, tuple) {
                        var action = tuple[0],
                            fn = jQuery.isFunction(fns[i]) && fns[i];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[tuple[1]](function() {
                            var returned = fn && fn.apply(this, arguments);
                            if (returned && jQuery.isFunction(returned.promise)) {
                                returned.promise()
                                    .done(newDefer.resolve)
                                    .fail(newDefer.reject)
                                    .progress(newDefer.notify);
                            } else {
                                newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                            }
                        });
                    });
                    fns = null;
                }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
            }
        },
        deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];

        // promise[ done | fail | progress ] = list.add
        promise[tuple[1]] = list.add;

        // Handle state
        if (stateString) {
            list.add(function() {
                // state = [ resolved | rejected ]
                state = stateString;

                // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }

        // deferred[ resolve | reject | notify ]
        deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
            return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise(deferred);

    // Call given func if any
    if (func) {
        func.call(deferred, deferred);
    }

    // All done!
    return deferred;
}




function aaa(){
    var dfd =  $.Deferred();
    dfd.resolve();
    return dfd;
}



function bbb(){
    var dfd =  $.Deferred();
    dfd.resolve();
    return dfd;
}



function ccc(){
    var dfd =  $.Deferred();
    dfd.resolve();
    return dfd;
}


function ddd(){
    var dfd =  $.Deferred();
    dfd.resolve();
    return dfd;
}


aaa.done(function(){

})



$.when(aaa(),bbb(),ccc(),ddd()).done(function(){

})



 
 