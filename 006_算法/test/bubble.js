
var arr = [12, 13, 12, 312, 321, 321, 3];

function bubble(arr) {
    for (var i = 0; i < arr.length;i++){
         for(j=0;j<arr.length;j++){
              if(arr[i]>arr[j]){
                  var temp = arr[j];
                  arr[j] = arr[i];
                  arr[i] = temp;
              }
         }
    }
    return arr;
}

console.log(bubble(arr))

