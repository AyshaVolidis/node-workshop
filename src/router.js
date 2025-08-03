// const fs=require('fs');
// const querystring = require('querystring');
// const { publichome, publicAssets } = require('./handlers.js');

// const message='Hello, World! Aysha Volidis is developing a Node.js server.';

// const router=(request,response)=>{
//     const endpoint=request.url
//     console.log(endpoint);
//     const method=request.method;
//     console.log(method);
//     if(endpoint=='/'){
//         publichome(request, response);
//     }
//     else if(endpoint.indexOf('public') !== -1){
//         publicAssets(request, response);
//     }
//     else if(endpoint=='/node'){
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write('<h1>Welcome to the Node.js server!</h1>');
//         response.end();
//     }
//     else if(endpoint=='/girls'){
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write('<h1>Welcome to the girls workshop!</h1>');
//         response.end();
//     }
//     else if(endpoint=='/create-post' && method==='POST'){
//         let allData='';
//         request.on('data', (chunkofdata) => {
//             allData += chunkofdata;
//         })

//         request.on('end',()=>{
//             let convertedData=querystring.parse(allData);
//             console.log(convertedData);
//             response.writeHead(302, {location: '/'});
//             response.end()
//         })
//     }
//     else{
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         // response.write(message);
//         response.end(message);
//     }

  
// }

// module.exports=router;

const fs = require('fs');
const path=require('path')
const querystring=require('querystring')
const { readPosts,publichome, publicAssets } = require('./handlers.js');

const router=(request,response)=>{
    const url=request.url
    if(url=='/'){
        publichome(request,response)
    }
    else if(url.indexOf('public')!==-1){
        publicAssets(request,response)
    }
    else if(url=='/create-post' && request.method==='POST'){
        let allData=''
        request.on('data',(chunkofdata)=>{
            allData+=chunkofdata
        })

        request.on('end',()=>{
            let convertedData=querystring.parse(allData)
            let timestamp=Date.now()
            let ContentPost=convertedData["post"]||''
            console.log(convertedData)
            const filepath = path.join(__dirname, 'posts.json');
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    console.error('Error reading posts.json:', err);
                    return
                }

                let posts={}
                posts=JSON.parse(data)||{}
                posts[timestamp]=ContentPost
                fs.writeFile(filepath,JSON.stringify(posts),(err)=>{
                    if(err){
                    console.error('Error writing posts.json:', err);
                    response.writeHead(500);
                    return response.end('Internal Server Error')
                    }
                    response.writeHead(302, {location: '/'});
                    response.end()
                })
            });
        })
    }
    else if(url=='/posts'){
        readPosts(request,response)
    }
    else{
        response.end('hello')
    }
}

module.exports=router