'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { Buffer } = require('buffer');
const formidable = require('formidable');
const dbConnect = require('./db');

// global.uniCloud = require('./uniCloud-original');

function handleRequestBody(req, callback) {
  let body = '';
  if (req.method === 'POST') {
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = body ? JSON.parse(body) : {};
      callback(data);
    });
  } else {
    callback(null);
  }
}

function handleGetRequest(req, res) {
  const filePath = getFileFromRequest(req.url);
  if (filePath) {
    const extname = path.extname(filePath);
    const contentType = getContentType(extname);
    if (contentType) {
      res.setHeader('Content-Type', contentType);
      fs.readFile(filePath, function (err, data) {
        if (err) {
          res.statusCode = 404;       
          res.end('File not found');
        } else {
          res.statusCode = 200;
          res.end(data);
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Invalid Content-Type');
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
}

function handlePostRequest(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({
        error: 'Internal Server Error',
      }));
      return;
    }

    // 获取上传的图片文件对象
    const imageFile =  files.file;

    // 设置上传的图片文件路径
    const uploadPath = `./static/${Date.now()}-${imageFile.originalFilename}`;

    // 读取上传的图片文件并保存到指定目录
    const readStream = fs.createReadStream(imageFile.filepath);
    const writeStream = fs.createWriteStream(uploadPath);
    readStream.pipe(writeStream);

    // 上传图片文件成功后返回一个 JSON 数据
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type") 
    res.statusCode = 200;
    res.end(uploadPath.replace(/.*\//, ''));
  });
}

function getContentType(extname) {
  switch (extname) {
    case '.jpg':
      return 'image/jpg';
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      return null;
  }
}

function getFileFromRequest(url) {
  const fileName = path.basename(url);
  if (fileName.indexOf('.') !== -1) {
    return path.join(__dirname + '\\static', fileName);
  } else {
    return null;
  }
}

(async () => {
  global.db = await dbConnect();
  const { Router } = require('./common/uni-cloud-router')
  const router = new Router(require('./config.js'))

  // 将处理请求体数据的代码放在一个函数中
  function requestListener(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === 'POST' && req.url === '/upload') { 
      handlePostRequest(req, res);
    } else if(req.method === 'GET' && req.url.startsWith('/image/')) {
      handleGetRequest(req, res);
    } else {
      // 在函数handleRequestBody中处理请求体数据
      handleRequestBody(req, (data) => {
        // 设置响应头部信息，允许跨域访问
        router.serve({
          path: req.url,
          httpMethod: req.method,
          headers: {},
          data, // 直接传递解析出的JSON对象 
        }).then(result => { 
          res.setHeader("Content-Type", "application/json")
          res.setHeader("Access-Control-Allow-Headers", "Content-Type") 
          res.end(result.body)
        })
      })
    }
  }

  // 创建 HTTP 服务器
  const server = http.createServer(requestListener);
  server.listen(5000, () => console.log('Server started on port 5000'))

})()