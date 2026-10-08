// Tiny static server for previewing /standalone: node build/serve.js  ->  http://localhost:8765
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', process.argv[2] || 'standalone'); // e.g. node build/serve.js standalone-hab
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/') u = '/index.html';
  const fp = path.join(root, u);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8765, () => console.log('http://localhost:8765'));
