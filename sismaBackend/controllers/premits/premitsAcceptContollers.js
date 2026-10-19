
const {AcceptPermit,premits}=require('../../models/premits')
async function pushPremitsToAccepted(req,res){
    const {id} = req.body
    const payload= await premits.findById(id)
    if(payload){
        const newAcceptPremits=new AcceptPermit({
              nama:payload.name,
              nim:payload.nim,
              kelas:payload.class,
              deskripsi:payload.deskripsi,
              mataKuliah:payload.mataKuliah,
               idPremits:payload._id,
               idCreatePremitsMahasiswa:payload.objectIdMahasiswa,
               dateCreatePremits:payload.datePremits,
               dateAccepts:new Date()
        })
        if(newAcceptPremits){
            await newAcceptPremits.save()
            await premits.findByIdAndDelete(id)
            res.status(200).send(newAcceptPremits)
        }
        else{
            res.status(401).send('invalid to push Accept premits')
        }
        
    }   
    else{
        res.status(401).send('invalid to find id')
    }
}

async function getPremitsAccepted(req,res){
    try{
        const premitsResponse=await AcceptPermit.find()
        if(premitsResponse){
            res.status(200).send(premitsResponse)
            
        }
        else{
            res.status(401).send('invalid to get premits')
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}


module.exports={
    pushPremitsToAccepted,
    getPremitsAccepted
}