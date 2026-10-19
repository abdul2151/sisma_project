const mongoose =require('mongoose')
const imgSchema=new mongoose.Schema({
    filename:{
        type:String
    },
    size:{
        type:String
    },
    url:{
        type:String
    }
})
const imgProfile = mongoose.model('imgProfile',imgSchema)

module.exports=imgProfile