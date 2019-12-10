// const dns = require("dns");

// let domain = 'nodejs.org';

// dns.resolve(domain,function(err,address){
// 	if(err){
// 		console.log(err);
// 		return;

// 	}
// 	console.log(address)
// })


const dns = require("dns");
dns.reverse('114.114.114.114',function(err,address){
	console.log(address);
})