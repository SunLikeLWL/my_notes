const util = require("util");

var obj = {
	name:"Sansa",
	age:"12"
}

let str = util.inspect(obj);


console.log(str);