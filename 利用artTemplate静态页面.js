const http = require('http');
const template = require('art-template');
const fs = require('fs');
const server = http.createServer();
let url = require('url');
server.listen(7878, '127.0.0.1', function () {
    console.log('http://127.0.0.1:7878/')
});
server.on('request', (req, res) => {
    let requrl = url.parse(req.url, true);
    if (req.url.startsWith('/extra')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        fs.readFile(__dirname + req.url, (err, data) => {
            if (err) { console.log(err) };
            res.end(data);
        })
    } else
        if (req.url === '/views/indexcopy.html') {
            fs.readFile(__dirname + '/data/index.json', (err, data) => {
                if (err) { console.log(err) };
                let arr = JSON.parse(data)
                let html = template(__dirname + '/views/indexcopy.html', { arr: arr });
                res.end(html)
            })
        } else
            if (req.url === '/views/addcopy.html') {
                fs.readFile(__dirname + "/views/addcopy.html", (err, data) => {
                    if (err) { throw err; }
                    res.end(data);
                })
            }
    if (requrl.pathname === '/addHero' && req.method === "GET") {
        fs.readFile(__dirname + '/data/index.json', (err, data) => {
            if (err) console.log(err);
            let jsonArr = JSON.parse(data);
            let id = 0;
            jsonArr.forEach(e => {
                if (e.id > id) {
                    id = e.id
                }
            })
            requrl.query.id = id + 1
            jsonArr.push(requrl.query)
            let jsonStr = JSON.stringify(jsonArr);
            fs.writeFile(__dirname + '/data/index.json', jsonStr, (err) => {
                if (err) console.log(err);
                res.end(JSON.stringify({ code: 200, msg: '添加成功' }))
            })
            // console.log(requrl.query)
        })
    }

})