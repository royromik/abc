var http = require('http');
var fs = require('fs');
var path = require('path');

function errorHandling(path, res , type){
      fs.readFile(path, (error, content) => {
            if (error) {
                  if (error.code == 'ENOENT') {
                        fs.readFile('../client/404.html', function (error, content) {
                              res.writeHead(404, { 'Content-Type': 'text/html' });
                              res.end(content, 'utf-8');
                        });
                  }
                  else {
                        res.writeHead(500);
                        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                  }

            }
            else {
                  var readFileData = fs.createReadStream(path, 'UTF-8');
                  res.writeHead(200, { 'content-type': type });
                  readFileData.pipe(res);
            }
      })
}

http.createServer((req, res) => {
      if (req.url == '/') {
            fs.readFile('../client/index.html', 'UTF-8', (error, data) => {
                  res.writeHead(200, { 'content-type': 'text/html' })
                  res.end(data);
            })
      } else if (req.url.match(/.css$/)) {
            var cssPath = path.join(__dirname, '../client', req.url);
            errorHandling(cssPath, res, 'text/css')

      } else if (req.url.match(/.js$/)) {
            var jsPath = path.join(__dirname, '../client', req.url);
            errorHandling(jsPath, res, 'text/javascript')
      } else if (req.url.match(/.json$/)) {

            var jsonPath = path.join(__dirname, '../', req.url);
            var readJsonFileData = fs.createReadStream(jsonPath, 'UTF-8');
            res.writeHead(200, { 'content-type': 'application/json' });
            readJsonFileData.pipe(res);
      } else {
            res.writeHead(404, { 'content-type': 'text/html' })
            res.end('No Page Found')
      }


      console.log(req.url);


}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');