const users = require('../Data/users')

function findAll(){
    return new Promise ((resolve, reject) => {
        resolve(users)
    })
}

module.exports ={
    findAll, 
}