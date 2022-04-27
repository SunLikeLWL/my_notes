class Person {
    // 公有属性
    sex = '中性'
    // 私有属性
    #height = 160

    // constructor 构造函数 一个类只能有一个
    // 一个构造函数可以使用 super 关键字来调用一个父类的构造函数。
    constructor(name, age, height) {
        this.name = name
        this.age = age
        this.#height = height
    }

    // Getter
    get info() {
        console.log('name: ' + this.name + '-- age: ' + this.age)
    }

    // Methods
    log() {
        console.log('name: ' + this.name + '-- age: ' + this.age + '-- sex: ' + this.sex + '-- #height: ' + this.#height)
    }

    // static
    // 静态方法 作用于类本身
    // 只有类本身才能调用
    static getName() {
        console.log(this.name)
    }

    static a = 1
}

class Man extends Person {
    // 子类中定义了构造函数，那么它必须先调用 super() 才能使用 this 
    constructor(name, age, height, sex) {
        super(name, age, height)
        this.sex = sex
    }

    log() {
        //+ '-- #height: ' + this.#height
        // #height 私有的在这里拿不到
        console.log('name: ' + this.name + '-- age: ' + this.age + '-- sex: ' + this.sex)
    }
}

const man = new Man('Joe', 10, 90, '男')
