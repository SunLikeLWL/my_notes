var http = require("http");
http.createServer(function(request,response){
	response.writeHeader(200,{'Content-Type':'text/plain'});
	
	response.end("Hello World!");
}).listen(2222)


console.log("Server running at http://localhost:2222");

