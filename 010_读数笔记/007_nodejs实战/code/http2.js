var http2 = require("http2");


const fs = require("fs");

const server  = http2.createSecureServer({
	key:fs.readFileSync("./ssl/localhost-privkey.pem"),
	cert: fs.readFileSync("./ssl/localhost-cert.pem")
});


server.on("error",function(err){
	console.log(err);
})

server.on("stream",function(stream,headers){
	stream.response({
		'content-type':'text/html',
		':status':200
	});
	stream.end("<h1>Hello HTTP2</h1>")
})

server.listen(2222)