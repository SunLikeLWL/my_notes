var ObjPro = Object.prototype,
    hasOwn = ObjPro.hasOwnProperty,
    nativeReduce = ObjPro.reduce;

Array.prototype.reduce = nativeReduce || function (callBack, initialVal) {
    if (typeof callBack != 'function') return;

    var init = initialVal,
        i = 0;

    if (init === void (0)) {
        init = this[0];
        i = 1;
    }
    for (i, len = this.length; i < len; i++) {
        if (hasOwn.call(this, i)) {
            init = callBack(init, this[i], i, this);
        }
    }
    return init;
}