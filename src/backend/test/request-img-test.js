const rp = require('request-promise')
const _ = require('lodash')
const UserAgent = require('./../lib/UserAgent')

async function test(url){
    let headers = {
        "User-Agent": UserAgent(),
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache"
    }

    let response = await rp({url, headers})

    console.dir(response)

    var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
    var size = 0;　　 //保存缓冲数据的总长度
    response.on('data',function(chunk){
        chunks.push(chunk);
        size += chunk.length;
    });

    response.on('end',function(err){
        var data = Buffer.concat(chunks, size);
        console.log(Buffer.isBuffer(data));
        var base64Img = data.toString('base64');
        console.log(base64Img);
    });
}


// test("https://i0.hdslb.com/bfs/emote/1033765809430b9447ab3866acab72bbd99cfcdd.png")


var http = require('https');
var url = "https://i0.hdslb.com/bfs/emote/1033765809430b9447ab3866acab72bbd99cfcdd.png";
http.get(url,function(res){
    var chunks = []; //用于保存网络请求不断加载传输的缓冲数据
    var size = 0;　　 //保存缓冲数据的总长度
    res.on('data',function(chunk){
        chunks.push(chunk);　
        size += chunk.length;
    });

    res.on('end',function(err){
        var data = Buffer.concat(chunks, size);
        console.log(Buffer.isBuffer(data));
        var base64Img = data.toString('base64');
        console.log(base64Img);
    });

});