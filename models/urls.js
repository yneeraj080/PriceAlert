const mongoose = require('mongoose');
const {Schema}=mongoose;

const urlSchema = new Schema({
    chatId:{
        type:String,
    },
    url:{
        type:String
    },
    setPrice:{
        type:Number
    }
})

module.exports = mongoose.model('urls',urlSchema)