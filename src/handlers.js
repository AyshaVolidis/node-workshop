// const fs = require("fs");
// const path = require("path");

// const publichome = (request, response) => {
//   const filepath = path.join(__dirname, "..", "public", "index.html");
//   fs.readFile(filepath, (err, file) => {
//     if (err) {
//       console.log(err);
//       response.writeHead(404, { "Content-Type": "text/html" });
//       response.end(
//         "<h1>404 Not Found</h1><p>The requested file does not exist.</p>"
//       );
//     } else {
//       response.writeHead(200, { "Content-Type": "text/html" });
//       response.end(file);
//     }
//   });
// };

// const publicAssets = (request, response) => {
//   const extension = endpoint.split(".")[1];
//   let extensionType = {
//     css: "text/css",
//     js: "application/javascript",
//     jpg: "image/jpg",
//   };
//   const filepath = path.join(__dirname, "..", endpoint);
//   fs.readFile(filepath, (err, file) => {
//     if (err) {
//       console.log(err);
//       response.writeHead(404, { "Content-Type": "text/html" });
//       response.end(
//         "<h1>404 Not Found</h1><p>The requested file does not exist.</p>"
//       );
//     } else {
//       response.writeHead(200, { "Content-Type": extensionType[extension] });
//       response.end(file);
//     }
//   });
// };

// module.exports = {
//   publichome,
//   publicAssets,
// };



const fs = require("fs");
const path = require("path");

const publichome = (request, response) => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filepath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(
        "<h1>404 Not Found</h1><p>The requested file does not exist.</p>"
      );
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(file);
    }
  });
};

const publicAssets = (request, response) => {
  let endpoint = request.url;
  const extension = endpoint.split(".")[1];
  let extensionType = {
    css: "text/css",
    js: "application/javascript",
    png: "image/png",
    ico:"image/x-icon"
  };
  const filepath = path.join(__dirname, "..", endpoint);
  fs.readFile(filepath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(
        "<h1>404 Not Found</h1><p>The requested file does not exist.</p>"
      );
    } else {
      response.writeHead(200, { "Content-Type": extensionType[extension] });
      response.end(file);
    }
  });
};

const readPosts=(request,response)=>{
  const filepath = path.join(__dirname, 'posts.json');
  fs.readFile(filepath, (err, data) => {
      if (err) {
          console.error('Error reading posts.json:', err);
          response.writeHead(500, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ error: 'Internal Server Error' }));
          
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(data);
  });
}

module.exports = {
  publichome,
  publicAssets,
  readPosts
};