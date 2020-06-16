var http = require('http');
var url = require('url');
var fs = require('fs');



let messageList = [];

function handleRequest(request, response) {
  var urlData = url.parse(request.url, true);
  var filename = "." + urlData.pathname;
  let parameters = urlData.query;


    switch (filename) {
  

    case "./Livechat/message.txt":

    if(parameters.msg !== undefined && parameters.msg != ""){

      console.log(parameters.nick +": " + parameters.msg );

      messageList.push([(parameters.nick), (parameters.msg)]);
       
    }
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end();
    break;

    case "./Livechat/chathistory.txt":
     
      for (let message of messageList) {
       if (!message || !message[0] || !message[1]) {
            continue;
        }
        if(parameters.nick === message[0]) {
          let bubblesender=
          "<div class='row no-gutters'>\n" +
          "<div class='col-md-3'> \n"+
          "<div class='chat-bubble-you'>\n"+
          "<p class='chat-text'>\n"+
          message[1] +"</p>\n"+
          "</div>\n"+
          "</div>\n"+
          "</div>";
          console.log("im inside1");
          console.log(message[0] +": "+ message[1]);
          response.write(bubblesender);

        } else {
          let bubblereceiver=
          "<div class='row no-gutters'>\n" +
          "<div class='col-md-3 offest-9'> \n"+
          "<div class='chat-bubble-me'>\n"+
          "<p class='chat-text'>\n"+
          message[1]+"</p>\n"+
          "</div>\n"+
          "</div>\n"+
          "</div>";
          console.log("im inside2");
          response.write(bubblereceiver);
        }
      }
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end();
        
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

let server = http.createServer(handleRequest);
server.listen(3000);
console.log("Chat server is running!");