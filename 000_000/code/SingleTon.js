class SingleTon{
    private static instance
    private construtor(){}
    public static getInstance(){
        if(this.instance === null){
            this.instance = new SingleTon()
        }
        return this.instance
    }
    f1(){}
    f2(){}
}



const s = SingleTon.getInstance()

s.fn1()
s.fn2()


const s1 = SingleTon.getInstance()

s1.fn1()
s1.fn2()


s === s1 // true
