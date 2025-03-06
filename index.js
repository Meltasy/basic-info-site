const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function(req, res) {
  const q = url.parse(req.url, true)
  const filename = q.pathname === '/' ? './index.html' : '.' + q.pathname + '.html'
  fs.readFile(filename, function(err, data) {
    if (err) {
      fs.readFile('./404.html', function (err404, data404) {
        if (err404) {
          res.writeHead(404, {'content-type': 'text/html'})
          res.write('404 not found')
        }
        res.writeHead(404, {'content-type': 'text/html'})
        res.write(data404)
        return res.end()
      })
      return
    }
    res.writeHead(200, {'content-type': 'text/html'})
    res.write(data)
    return res.end()
  })
}).listen(8080)
