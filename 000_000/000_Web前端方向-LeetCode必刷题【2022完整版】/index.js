/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function(s) {
    s=  s.trim()
    let stack = new Array()
    let preSign = '+'
    let num = 0
    for(let i=0;i<s.length;i++){
        if(!isNaN(s[i])&& s[i]!==' '){
            num = num*10+Number(s[i])
            console.log(num)
        }
       
        if(isNaN(s[i]) || i===s.length-1){
            switch(preSign){
                case"+":
                stack.push(num)
                break;
                  case"-":
                  stack.push(num)
                break;
                  case"*":
                  stack.push(stack.pop()*num ||0)
                break;
                  case"/":
                   stack.push(stack.pop()/num ||0)
                break;
            }
            preSign  =s[i]
            num =0
        }
    }
    console.log(stack)
    return stack.reduce((a,b)=>a+b)
};


calculate('3+2*2')