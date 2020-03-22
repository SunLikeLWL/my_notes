JQuery源码解读


JQ的事件队列（ 妙味讲堂 - 视频笔记）



1、queue

1、处理同步事件队列
2、同理异步事件队列
3、比defferred函数要强大

1、实例1
    < style >
#box{
    width: 100px;
    height: 100px;
    background - color: red;
    position: fixed;
}

</style >
    <div id='box'></div>

    <script>
        $("#box").click(function(){
            $(this).animate({
                width: 300
            }, 2000);// 事件1
            $(this).animate({
                height: 300
            },2000);// 事件2
            $(this).animate({
                left: 300
           },2000);// 事件3
           $(this).promise().done(functon(){
                console.log("done")
            })
       })
        // 先将三个事件入队
        // 0秒：事件1出队并执行
        // 2秒：事件2出队并执行
        // 4秒：事件3出队并执行
        // 最后输出done
</script>  




2、实例2
< style >
#box{
    width: 100px;
    height: 100px;
    background - color: red;
    position: fixed;
}

</style >
    <div id='box'></div>

    <script>
        $("#box").click(function(){
            // 也可以链式调用
            // 使用回调的形式，执行不可控
            $(this).animate({
                width: 300
            }, 2000).queue(function () {
                this.dequeue()
            }).animate({
                height: 300
            }, 2000).queue(function () {
                this.dequeue()
            }).animate({
                left: 300
            }, 2000).queue(function () {
                this.dequeue()
            }).promise().done(function () {
                console.log("done");
            })
        })
        // 先将三个事件入队
        // 0秒：事件1出队并执行
        // 2秒：事件2出队并执行
        // 4秒：事件3出队并执行
        // 最后输出done
</script>  




3、实例3
    < style >
#box{
    width: 100px;
    height: 100px;
    background - color: red;
    position: fixed;
}

</style >
    <div id='box'></div>

    <script>
        $("#box").click(function(){
            // 也可以链式调用
            // 使用queue的形式进行出入对操作，执行可以控制
            $(this).animate({
                width: 300
            }, 2000).queue('fx', function (next) {
                let _this = this;
                this.setInterval(function () {
                    next()
                }, 2000)
            }).animate({
                height: 300
            }, 2000).queue('fx', function (next) {
                next()
            }).animate({
                left: 300
            }, 2000).queue('fx', function (next) {
                next()
            })
            // 监听所有事件结束
            $(this).promise().done(function(){
            console.log("done");
})
})
// 先将三个事件入队
// 0秒：事件1出队并执行
// 2秒：事件2出队并执行
// 4秒：事件3出队并执行
// 最后输出一个done

</script>  




4、实例


function a() {
    console.log("a");
}
function b() {
    console.log("b");
}

$.queue(document, 'q1', a); // a函数入队
$.queue(document, 'q2', b); // b函数入队
$.queue(document, 'q3', [a, b]); // a,b函数入队

$dequeue(document, 'q1');// a a()函数出队并执行

$dequeue(document, 'q2');// b b()函数出队并执行

$dequeue(document, 'q3');// a;b a(),b()函数出队并执行




5、源码实现

jQuery.extend({
    queue: function (elem, type, data) {
        var queue;
        //elem 操作元素
        //type 事件名
        // data 操作，函数
        if (elem) {
            type = (type || "fx") + "queue";
            queue = jQuery._data(elem, type);

            // Speed up dequeue by getting out quickly if this is just a lookup
            if (data) {
                if (!queue || jQuery.isArray(data)) {
                    //不存在事件队列的时候，重新创建数据缓存
                    //jQuery.isArray(data)判断传进来的事件是数组则会重新创建队列并覆盖之前的队列
                    queue = jQuery._data(elem, type, jQuery.makeArray(data));
                } else {
                    // 事件队列存在，并且参数不是数组，则直接入队
                    queue.push(data);
                }
            }
            return queue || [];
        }
    },

    dequeue: function (elem, type) {
        type = type || "fx";
        // 先获取事件队列
        var queue = jQuery.queue(elem, type),
            // 获取队列的长度
            startLength = queue.length,
            // 出队并赋值给fn，但是没有执行
            fn = queue.shift(),
            hooks = jQuery._queueHooks(elem, type),
            next = function () {
                jQuery.dequeue(elem, type);
            };
        // If the fx queue is dequeued, always remove the progress sentinel
        // inprogress标识存在就删除
        if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
        }
        if (fn) {

            // Add a progress sentinel to prevent the fx queue from being
            // automatically dequeued
            if (type === "fx") {
                // 针对第一次出队的时候，出队完后添加一个标识
                queue.unshift("inprogress");
            }
            // clear up the last queue stop function
            delete hooks.stop;
            fn.call(elem, next, hooks);
        }
        if (!startLength && hooks) {
            hooks.empty.fire();
        }
    },
})



jQuery.fn.extend({
    // 2
    queue: function (type, data) {
        var setter = 2;

        if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
        }

        if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
        }

        return data === undefined ?
            this :
            this.each(function () {
                var queue = jQuery.queue(this, type, data);

                // ensure a hooks for this queue
                jQuery._queueHooks(this, type);

                if (type === "fx" && queue[0] !== "inprogress") {
                    // 第一个入队之后立即出队
                    jQuery.dequeue(this, type);
                }
            });
    },
    dequeue: function (type) {
        // 对队列数组进行出队
        return this.each(function () {
            jQuery.dequeue(this, type);
        });
    },

    clearQueue: function (type) {
        return this.queue(type || "fx", []);
    },
});




jQuery.fn.extend({
    // 2
    queue: function (type, data) {
        var setter = 2;

        if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
        }

        if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
        }

        return data === undefined ?
            this :
            this.each(function () {
                var queue = jQuery.queue(this, type, data);

                // ensure a hooks for this queue
                jQuery._queueHooks(this, type);

                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
    },
    dequeue: function (type) {
        return this.each(function () {
            jQuery.dequeue(this, type);
        });
    },
    // 延迟队列执行
    delay: function (time, type) {
        // jQuery.fx.speeds[time] 默认的时间
        // jQuery.fx.speeds = {
        //     slow: 600,
        //     fast: 200,
        //     // Default speed
        //     _default: 400
        // };

        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        // 设置定时器再进出队
        return this.queue(type, function (next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function () {
                clearTimeout(timeout);
            };
        });
    },
    clearQueue: function (type) {
        // 清空队列
        return this.queue(type || "fx", []);
    },
    // 当所有的事件都执行完成之后
    promise: function (type, obj) {
        var tmp,
            count = 1,
            // 定义一个延迟对象
            defer = jQuery.Deferred(),
            elements = this,
            i = this.length,
            resolve = function () {
                if (!(--count)) {
                    //全部出队，修改状态
                    defer.resolveWith(elements, [elements]);
                }
            };

        if (typeof type !== "string") {
            obj = type;
            type = undefined;
        }
        type = type || "fx";

        while (i--) {
            tmp = jQuery._data(elements[i], type + "queueHooks");
            if (tmp && tmp.empty) {
                count++;
                tmp.empty.add(resolve);
            }
        }
        resolve();
        return defer.promise(obj);
    }

});