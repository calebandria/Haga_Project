const Product = require('../models/userModel')


async function getUsers (req, res){
    try {
        const users = await Product.findAll()
        
        res.writeHead(200, { 'Content-Type' : 'application/json'})
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getUsers
}