var arr = [4324,324,324,324,324,32,4323];

function insert(arr){
    var len = arr.length;
    var preIndex,current;
    for(var i=1;i<len;i++){
       preIndex =  i-1;
       current = arr[i];
       while(preIndex>=0&&arr[preIndex]>current){
           arr[preIndex+1] = arr[preIndex];
           preIndex --;
       }
       arr[preIndex+1] = current;
   }
    return arr;
}


console.log(insert(arr));