var generate  = function(numRows){
    let res = []

    let combine =  function(m,n){
        if(n == 0){
            return 1
        }else if (m ==n){
           return 1
        }else{
            return combine(m-1,n)+ combine(m-1,n-1)
        }
    }

    for(let i=0;i<numRows;i++){
        let arr = []
        for(let j=0;j<=i;j++){
            arr.push(combine(i,j))
        }
        res.push(arr)
    }
    return res
}
