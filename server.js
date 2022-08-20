const http = require('http')
const {loginView} = require('./Controllers/loginController')
const {registerView} = require('./Controllers/signinController')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

// Mongo DB connection
const database = process.env.MONGO_URI;
mongoose.connect(database, {useUnifiedTopology: true , useNewUrlParser : true}).then(() => console.log('e don connect'))
.catch(err => console.log(err));

// Creating the server
const server = http.createServer((req,res) => {
     loginView(req,res);
     registerView(req,res);
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT} `))
// In this case, shouldn't we listen to where the filesytem is placing our project render? Y