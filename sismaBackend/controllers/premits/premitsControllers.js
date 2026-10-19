const {premits,premitsCollection} = require('../../models/premits')
async function newPremits(req,res){
    const {nama,nimMhs,kelas,content,matkul,datenow,IdMahasiswa} = req.body
    const payload={
        name:nama,
        nim:nimMhs,
        class:kelas,
        deskripsi:content,
        mataKuliah:matkul,
        datePremits:datenow,
        objectIdMahasiswa:IdMahasiswa
    }
    const newPremits=new premits(payload)
    await newPremits.save()
    if(newPremits){
        const datenow = new Date()
        const premitsCollectionNew = new premitsCollection({
            collectionPremits:newPremits._id,
            dateCollection:datenow
        })
        premitsCollectionNew.save()
        
    res.json({payload,newPremits})
    }
    else{
        res.json({
            status:404,
            massage:'invalid to create new premits'
        })
    }
}


async function viewPremitsById(req,res){
    const {id}=req.params
    const getPremitsById= await premits.findById(id)
    res.status(200).send(getPremitsById)
}

async function deletePremits(req,res){
    const {id}=req.params
    const deletePremits=await premits.findByIdAndDelete(id)
    if(deletePremits){
        res.status(200).send('sukses delete premits')
    }
    else{
        res.status(300).send('invalid to delete premits')
    }
}
async function updatePremits(req,res){
    const {id}=req.params
    const {nama,nimMhs,kelas,content,matkul,datenow,objectid} = req.body
    const payload={
        name:nama,
        nim:nimMhs,
        class:kelas,
        deskripsi:content,
        mataKuliah:matkul,
        datePremits:datenow,
        objectIdMahasiswa:objectid
    }
    const updatePremits= await premits.findByIdAndUpdate(id,payload)
    if(updatePremits){
        res.status(200).json({
        updatePremits
        })
    }
    else{
        res.status(300).send('invalid to update premits')
    }
}
async function getPremits(req,res){
    const dataPremits=await premits.find()
    res.status(200).send(dataPremits)
}

async function getPremitsByIdUser(req,res){
        const {id}=req.params
        const response = await premits.find({objectIdMahasiswa:id})
        if(response){
            res.status(200).send(response)
        }
        else{
            res.status(401).send('invalid to get premits')
        }
    }



module.exports ={
    newPremits,
    viewPremitsById,
    deletePremits,
    updatePremits,
    getPremits,
    getPremitsByIdUser,
}