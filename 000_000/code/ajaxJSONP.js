$.ajaxJSONP = function (options, deferred) {
    // 直接调ajaxJSONP没有传入type，去走$.ajax
    if (!('type' in options)) return $.ajax(options)
    // 获取callback函数名，此时未指定为undefined
    var _callbackName = options.jsonpCallback,
      // jsonpCallback可以是一个函数或者一个字符串
      // 是函数时，执行该函数拿到其返回值作为callback函数
      // 为字符串时直接赋值
      // 没有传入jsonpCallback，那么使用类似'Zepto3726472347'作为函数名
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
      // 创建一个script标签用来发送请求  
      script = document.createElement('script'),
      // 先读取全局的callbackName函数，因为后面会对该函数重写，所以需要先保存一份
      originalCallback = window[callbackName],
      responseData,
      // 中止请求，触发script元素上的error事件, 后面带的参数是回调函数接收的参数
      abort = function (errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout
  
    if (deferred) deferred.promise(xhr)
    // 给script元素添加load和error事件
    $(script).on('load error', function (e, errorType) {
      // 清除超时定时器
      clearTimeout(abortTimeout)
      // 移除添加的元素(注意这里还off了，不然超时这种情况，请求回来了，还是会走回调)
      $(script).off().remove()
      // 请求出错或后端没有给callback中塞入数据，将触发error
      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        // 请求成功，调用成功回调，请塞入数据responseData[0]
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }
      // 将originalCallback重新赋值回去
      window[callbackName] = originalCallback
      // 并且判断originalCallback是不是个函数，如果是函数，便执行
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])
      // 清空闭包，释放空间
      originalCallback = responseData = undefined
    })
  
    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }
    // 重写全局上的callbackName
    window[callbackName] = function () {
      responseData = arguments
    }
    // 将回调函数名追加到?后面
    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    // 添加script元素
    document.head.appendChild(script)
    // 超时处理函数
    if (options.timeout > 0) abortTimeout = setTimeout(function () {
      abort('timeout')
    }, options.timeout)
  
    return xhr
  }