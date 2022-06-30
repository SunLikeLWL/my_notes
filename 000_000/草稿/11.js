var arr = [5,6,1,3,0,4,7,9]

var index  = [2,0,1,4,6,2,5,0,1,7,3]


var tell ='';

for(var i=0;i<index.length;i++){
    console.log(arr[index[i]])
   tell += arr[index[i]]
}

 console.log(tell)