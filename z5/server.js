const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
const PATH = "www/";
let artikal = [
    {
        "id": 1,
        "naziv": "aaaa",
        "cena": "123132",
        "imeKompanije": "asdasfasfa"
    },
    {
        "id": 2,
        "naziv": "bbb",
        "cena": "333333",
        "imeKompanije": "ffffff"
    },
    {
        "id": 3,
        "naziv": "safasf",
        "cena": "zzzzz",
        "imeKompanije": "asfasfasff"
    }
];

http.createServer(function (req, res){    
    let urlObj = url.parse(req.url,true,false);
    if (req.method == "GET"){

        if (urlObj.pathname == "/dodaj-artikal"){
            fs.readFile(PATH + "dodaj-artikal.html", function (err,data){
                if (err){
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
    else if(req.method == "POST") {

        if (urlObj.pathname == "/obrisi-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiArtikal(querystring.parse(body).id);
                res.writeHead(302, {
                    'Location': '/dodaj-artikal'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            var body = '';
                req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                           querystring.parse(body).cena,querystring.parse(body).imeKompanije);
                res.writeHead(302, {
                    'Location': '/dodaj-artikal'
                });
                res.end();
            });
        }
    }
}).listen(5000);


function obrisiArtikal(id){
    let pomocni = []
    for(let i=0;i<artikal.length;i++){
        if(artikal[i].id != id){
            pomocni.push(artikal[i])
        }
    }
    artikal = pomocni
    return artikal;
}
function dodajArtikal(id,naziv,cena,imeKompanije){
    let art = {
        'id': id,
        'naziv': naziv,
        'cena': cena,
        'imeKompanije': imeKompanije
    };
    artikal.push(art);
}