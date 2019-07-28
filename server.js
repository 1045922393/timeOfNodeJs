const http = require('http');
const server = http.createServer();
const fs = require('fs');
server.listen(7990, "127.0.0.1", function () {
    console.log('http://127.0.0.1:7990/');
});
server.on('request', (req, res) => {
    if (req.url.startsWith('/extra') || req.url.startsWith('/views')) {
        if (req.url.endsWith('css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) { console.log(err); }
            res.end(data);
        })
    } else {
        // if(req.url === '指定的借口'){

        // res.setHeader('Content-Type',)
        fs.readFile('./data/index.json', 'utf-8', (err, data) => {
            if (err) { console.log(err); }
            res.end(data)
        });
        // }

    }
})