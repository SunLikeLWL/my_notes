const querystring = require("querystring");

var obj = {
	name:"Sansa",
	age:"12"
}

let str = querystring.stringify(obj);


console.log(str);