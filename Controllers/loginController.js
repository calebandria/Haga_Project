const path = require('path');
const fs = require('fs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')



const loginView = (req, res) =>{
    //build filepath and building route
    let filePathLogin = path.join('views' ,req.url === '/' ? 'login.html' : req.url)
    // Extension of file
    let extname = path.extname(filePathLogin);
    // initial content type
    let contentType = 'text/html';
    //check extension and set content-type
    switch (extname){
        case'.js' :
        contentType = 'text/javascript';
        break;
        case '.css' :
        contentType = 'text/css';
        break;
        case '.json' :
        contentType = 'application/json';
        break;
        case '.png':
        contentType = 'image/png';
        break;
        case '.jpg' :
        contentType = 'image/jpg';
        break;
      }

      // Read file
      fs.readFile(filePathLogin, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // Page not found
                fs.readFile(path.join('views' ,'404.html'), content =>{
                    res.writeHead(200 ,{'Content-Type' : 'text/html'});
                    res.end(content ,'utf-8');
                })
            } else {
                // Some server error 
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success 
            res.writeHead(200 ,{'Content-Type' : contentType });
            res.end(content,'utf8');
        }
        })

        if(req.url ==='/login' && req.method ==='POST'){
            req.on('data', chunk =>{
                let data = (chunk.toString().split("&")).map(element =>element.slice(element.indexOf("=")+1));
                console.log(data)
                User.exists({ email: data[0]}, (err, doc) =>{
                    if (err){
                        console.log(err)
                    }else {
                        console.log("Result:", doc)
                       if(doc){
                        try {
                            console.log('Result :',doc._id.toString())
                            let token =jwt.sign(doc,'jesus is king', { expiresIn:'1h'});
                            console.log(token);
                        } catch (error) {
                            console.log(error)
                        }
                        

                       }
                        
                    }
                })
            })

        }
}
module.exports = {
    loginView
}