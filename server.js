const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    const read = fs.createReadStream(path.join(__dirname, 'public/index.html'))
    read.pipe(res);
  }
  console.log(req.url)
})

server.listen(5555);