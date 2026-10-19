const mongoose =require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String
    },
    nim:{
        type:Number
    },
    class:{
        type:String
    },
    deskripsi:{
        type:String
    },
    mataKuliah:{
        type:String
    },
    datePremits:{
        type:String
    },
    objectIdMahasiswa:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'objectIdMahasiswa'
    }
})

const premits = mongoose.model('premits',schema)

const collectionPremitsSchema = new mongoose.Schema({
    collectionPremits:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"premits"
    }],
    dateCollection:{
      type:String
    }  
  })
  const AcceptPermitSchema = new mongoose.Schema({
    nama:{
        type:String
    },
    nim:{
        type:String
    },
    kelas:{
        type:String
    },
    deskripsi:{
        type:String
    },
    mataKuliah:{
        type:String
    },
    idPremits:{
        type:String,
    },
    idCreatePremitsMahasiswa:{
        type:String,
    },
    dateCreatePremits:{
        type:String
    },
    dateAccepts:{
        type:Date
    }
  });
  const AcceptPermit = mongoose.model('AcceptPermit', AcceptPermitSchema);
  
  const premitsCollection = mongoose.model('premitsCollection',collectionPremitsSchema)
module.exports={premits,premitsCollection,AcceptPermit}