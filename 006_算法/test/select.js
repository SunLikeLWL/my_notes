var arr = [432,423,423,4,324,34,3,24];
 

function selectSort(arr){
    var len = arr.length;
    var minIndex,temp;
    for(var i=0;i<len-1;i++){
        minIndex = i;
        for(var j= i+1;j<len;j++){
             if(arr[i]<arr[minIndex]){
                 minIndex = i;
             }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

console.log(selectSort(arr));