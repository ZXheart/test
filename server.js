var http = require('http')
var fs = require('fs')
var path = require('path')

http
  .createServer(function (request, response) {
    var filePath = '.' + request.url
    if (filePath == './') {
      filePath = './test2.html'
    }

    var extname = String(path.extname(filePath)).toLowerCase()
    var mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      // 添加你需要支持的其他文件类型
    }

    var contentType = mimeTypes[extname] || 'application/octet-stream'

    fs.readFile(filePath, function (error, content) {
      if (error) {
        response.writeHead(404)
        response.end('File not found')
      } else {
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      }
    })
  })
  .listen(8000, '127.0.0.1')

console.log('Server running at http://127.0.0.1:8000/')
