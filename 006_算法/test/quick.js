// 快速排序

var arr =[432,432,423,432,423,43,54,54,45];


var quick = function(arr){
    if(arr.length<1){
        return arr;
    }
    var privotIndex = Math.floor(arr.length/2);
    
    var privot  = arr.splice(privotIndex,1)[0];

    var left = [];
    var right = [];

    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]>privot){
             left.push(arr[i])
        }
        else{
            right.push(arr[i])
        }
    }

    return quick(left).concat([privot],quick(right))
}


console.log(quick(arr))