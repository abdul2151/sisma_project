const mongoose =require('mongoose')
const schema = new mongoose.Schema({
    nia:{
        type:Number,
    },
    nama:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    role:{
        type:String
    }
})


const accountsAdmin = mongoose.model('accountsAdmin',schema)
module.exports = accountsAdmin