const accountsAdmin = require('../models/accountsAdmin')
const accountsMahasiswa=require('../models/accountsMahasiswa')
const bcrypt=require('bcrypt')

 const hasingAdmin = async(req, res, next) => {
    try{
const {nii,name,username,password,email}=req.body 
    if(nii==='' || name==='' || username==='' || password ==='' || email===''){
        res.status(300).send('input belum terisi semua')
    }
    else{
        const hash=bcrypt.genSaltSync(10)
        const passwordHash=bcrypt.hashSync(password,hash)
        const newAccounts = new accountsAdmin({
            nia:nii,
            name:name,
            user:username,
            pass:passwordHash,
            mail:email,
        }) 
        newAccounts.save()
        next()
    }
    }
    catch(err){
        res.status(404).send({massage:err.massage})
    }
};

const hasingMahasiswa=async(req,res,next)=>{
     const {nama,nimMhs,kelas,user,pass,mail}=req.body 
        if(nama==='' || nimMhs===''  || kelas===''|| user==='' || pass ==='' || mail===''){
            res.status(300).send('input belum terisi semua')
        }
        else{
            try{
                const hash=bcrypt.genSaltSync(10)
                const passwordHash=bcrypt.hashSync(pass,hash)
                const newAccounts = new accountsMahasiswa({
                    name:nama,
                    nim:nimMhs,
                    class:kelas,
                    username:user,
                    password:passwordHash,
                    email:mail,
                    role:'mahasiswa',
                })   
                if(newAccounts){
                    await newAccounts.save()
                    next()
                }
                else{
                    res.status(401).send('invalid to create Accounts')
                }
            }
            catch(err){
                throw new Error(err)
            }
        }
}

module.exports = { hasingAdmin,hasingMahasiswa };
