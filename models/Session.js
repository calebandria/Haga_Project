const mongoose = require('mongoose')
const SessionSchema = new mongoose.Schema({
    UserId : {
        type: Number,
        required: true,
    }

});
const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;