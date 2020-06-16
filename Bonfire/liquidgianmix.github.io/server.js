var http = require('http');
var url = require('url');
var fs = require('fs');


function handleRequest(request, response) {
  var urlData = url.parse(request.url, true);

  var filename = "." + urlData.pathname;
 
  switch (filename) {
    case "../About/index.html":
      response.writeHead(200, {'Content-Type': 'text/html'});
      break;
    case "../Contact/index.html":
      response.writeHead(200, {'Content-Type': 'text/html'});
      break;
    case "../Homepage/index.html":
      response.writeHead(200, {'Content-Type': 'text/html'});
      break;
    case "../Images/index.html":
      response.writeHead(200, {'Content-Type': 'images/png'});
      response.writeHead(200, {'Content-Type': 'images/gif'});
      break;
    case "../Livechat/index.html":
      response.writeHead(200, {'Content-Type': 'text/html'});
      break;

    default:
      fs.readFile(filename,
        function(error, data) {
          if (error) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("Error 404: " + urlData.pathname + " not found!");
            response.end();
          }
          else {
            if (/.html$/.test(filename))
              response.writeHead(200, {'Content-Type': 'text/html'});
            else if (/.css$/.test(filename))
              response.writeHead(200, {'Content-Type': 'text/css'});
            else
              response.writeHead(200, {'Content-Type': 'text/plain'});

            response.write(data);
            response.end();
          }
        }
      );
  }
}

var server = http.createServer(handleRequest);
server.listen(8080);
console.log("Chat server is running!");