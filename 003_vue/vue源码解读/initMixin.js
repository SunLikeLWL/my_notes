export function initMixin(Vue: Class<Component>) {
    Vue.prototype._init = function (options?: Object) {
        const vm: Component = this
        vm._uid = uid++
        // 如果是Vue的实例，则不需要被observe
        vm._isVue = true
        // 第一步： options参数的处理
        if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options)
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }
        // 第二步： renderProxy
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm)
        } else {
            vm._renderProxy = vm
        }
        // expose real self
        vm._self = vm

        // 第三步： vm的生命周期相关变量初始化
        initLifecycle(vm)

        // 第四步： vm的事件监听初始化
        initEvents(vm)
        callHook(vm, 'beforeCreate')
        initInjections(vm) // resolve injections before data/props

        // 第五步： vm的状态初始化，prop/data/computed/method/watch都在这里完成初始化，因此也是Vue实例create的关键。
        initState(vm)
        initProvide(vm) // resolve provide after data/props
        callHook(vm, 'created')

        // 第六步：render & mount
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}