// 全都运行在严格模式下
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _inherits(subClass, superClass) {
    // 超类必须是 funciont or null
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    // 继承
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    // 动态这是原型对象的指向
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    return function () {
        // 拿到超类
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            // 通过 apply 的方式
            // 继承成员属性
            result = Super.apply(this, arguments);
        }
        // 返回当前子类的实例
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    // 还没有被初始化- super()还没有被调用
    // void 0 相当于 undefined
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

//  判断是否支持 Refect or Proxy
function _isNativeReflectConstruct() {
    // Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的。
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect

    // 判断 Reflect 是否存在
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    // sham 属性暂不知道有啥用
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {
        }));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

// 判断当前 this 是不是 构造函数的实例
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

// 不能已函数的形式调用类
function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        // 终止程序
        throw new TypeError("Cannot call a class as a function");
    }
}

// 设置一些描述属性并绑定值
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    // 给原型添加方法
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    // 添加静态方法
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        // 试图设置只读私有字段
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
    return value;
}

var Person = /*#__PURE__*/function () {
    // 构造函数
    function Person(name, age, height) {
        // 判断构造函数的调用方式
        _classCallCheck(this, Person);

        // 给当前实例添加 sex 属性
        _defineProperty(this, "sex", '中性');

        // 私有属性
        _height.set(this, {
            writable: true,
            value: 160
        });

        // 添加成员属性
        this.name = name;
        this.age = age;

        // 设置私有属性
        _classPrivateFieldSet(this, _height, height);
    }


    _createClass(Person, [{ // 原型上的方法
        key: "log",
        value: function log() {
            console.log('name: ' + this.name + '-- age: ' + this.age + '-- sex: ' + this.sex + '-- #height: ' + _classPrivateFieldGet(this, _height));
        }
    }, {
        key: "info",
        get: function get() {
            console.log('name: ' + this.name + '-- age: ' + this.age);
        }
    }], [{ // 静态方法
        key: "getName",
        value: function getName() {
            console.log(this.name);
        }
    }]);

    return Person;
}();

// WeakMap 以对象做于 key ,值为任意类型
// 弱引用 不影响垃圾回收机制
var _height = new WeakMap();

// 静态属性
_defineProperty(Person, "a", 1);

var Man = /*#__PURE__*/function (_Person) {
    // 实现继承 并 动态绑定构造函数的原型对象
    _inherits(Man, _Person);

    // 创建一个获取父类的方法
    // 返回一个函数
    var _super = _createSuper(Man);

    function Man(name, age, height, sex) {
        var _this;

        _classCallCheck(this, Man);

        // 调用父类的构造函数
        _this = _super.call(this, name, age, height);
        _this.sex = sex;
        return _this;
    }

    _createClass(Man, [{
        key: "log",
        value: function log() {
            console.log('name: ' + this.name + '-- age: ' + this.age + '-- sex: ' + this.sex);
        }
    }]);

    return Man;
}(Person);

var man = new Man('Joe', 10, 90, '男');

// 动态的将 Man.__proto__ 指定成 Person
// 默认应该指向 Function.prototype
console.log(Man.__proto__ === Person) // true
console.log(Man.__proto__ === Function.prototype) // false
