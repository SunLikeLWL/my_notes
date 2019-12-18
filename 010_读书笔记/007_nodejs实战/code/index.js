const http = require("http");

var server = http.createServer(function(req,res){
    let data = '';
    req.on("data",function(chunk){
        data+=chunk; 
    });
    req.on("end",function(){
    	let method = req.method;
    	let url = req.url;
    	let headers = JSON.stringify(req.headers);
    	let httpVersion =  req.httpVersion;
    	res.writeHead(200,{
    		'Content-Type':'text/html'
    	})
    	let dataHtml = '<p>data: '+data+'</p>';
    	let methodHtml = '<p>url:'+method+'</p>';
    	let urlHtml = '<p>url:'+url+'</p>';
    	let headHtml = '<p>header:'+headers+'</p>';
    	let httpVersionHtml = '<p>http version:'+httpVersion+'</p>';
    	let resData = dataHtml+methodHtml+urlHtml+headHtml+httpVersionHtml;
    	res.end(resData);
    })
});


server.listen(2222,function(){
   console.log('listening port 2222')
})
