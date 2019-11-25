function getData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Promise")
        },0)
    })
}



console.log("start")

getData().then(function(){
    console.log("then")
})


console.log("end")