const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const {UserData} = require('../models/userData');


const registerView = (req, res) =>{
    //build filepath and building route
    let filePathRegister = path.join('views' ,req.url === '/register' ? 'signin.html' : req.url)
    // Extension of file
    let extname = path.extname(filePathRegister);
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
      fs.readFile(filePathRegister, (err, content) => {
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
        });

        // Renvoi des données e

        if(req.url === '/sinscrire' && req.method ==='POST'){
            req.on('data', chunk =>{
             let data = (chunk.toString().split("&")).map(element =>element.slice(element.indexOf("=")+1));
                 console.log(data);
                       if(data[0]==="" ||data[1]==="" ||data[2]==="" ||data[3]==="" ||data[4]==="" || data[3] !== data[4]){
                            console.log("Remplissez les cases manquantes");
                            if(data[3] !== data[4]){
                                console.log("Le mot de passe doit être le même");
                            }
                        } 
                       else {
                         // Validation
                        User.findOne({ email : data[2]}).then((user) =>{
                            if(user){
                                console.log('email already exists');
                                // Reading file again
                            } 
                            else { 
                                // Validation
                                const user = new UserData(data[0],data[1],data[2],data[3]);
                                const newUser = new User(user);
                                  // password Hashing
                                    bcrypt.genSalt(10 ,(err1,salt) =>
                                        bcrypt.hash(newUser.password, salt , (err, hash) =>{
                                            if (err1) throw err;
                                            newUser.password = hash;
                                            newUser
                                            .save()
                                            .then( ()=> { return res.url ==='/'})
                                            .catch((err) => console.log(err));
                                        })
                                );
                        }
                        });
                       }              
            })       
        }
}
module.exports = {
    registerView,
}