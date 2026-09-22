const http = require("http");
const server = http.createServer((req,res)=>){
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
res.end("Hello world");
});

server.listen(1000,() =>{
    console.log("Server is running on port 1000");
});