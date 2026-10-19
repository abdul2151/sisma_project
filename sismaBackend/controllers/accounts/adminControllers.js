
const accountsAdmin = require('../../models/accountsAdmin')
const jwt= require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {generateToken}= require('../token/generateToken')
async function createAccountsAdmin(req,res){
    try{
        const {niaa,name,user,pass,mail}=req.body
        const createNewAccountsAdmin= new accountsAdmin({
            nia:niaa,
            nama:name,
            username:user,
            password:pass,
            email:mail,
            role:"admin"
        })
        if(!createNewAccountsAdmin){
           return res.status(401).send('invalid create new accounts admin')
        }
        createNewAccountsAdmin.save()
        return res.status(200).send('sukses create accounts')
    }
    catch(err){
        res.status(400).send({massage:err.massage})
    }
}


async function loginAuthAdmin(req,res){
        const { user, pass } = req.body;

    // Cari user 1 orang saja
    const authUsername = await accountsAdmin.findOne({ username: user });

    console.log(authUsername)
    // Jika username tidak ditemukan
    if (!authUsername) {
        return res.status(305).send('not match data');
    }

    // Cek password
    const authPassword = bcrypt.compareSync(pass, authUsername.password);
    if (!authPassword) {
        return res.status(304).send('invalid login, not match password');
    }

    // Siapkan payload
    const payload = {
        status: 200,
        boolean: true,
        roleUser: authUsername.role,
        idMahasiswa: authUsername._id
    };

    // Generate token
    const token = generateToken(payload);
    // const decodeToken = decodeToken(token);

    if (!token) {
        return res.status(300).send('invalid to generate token');
    }

    // Kirim response hanya SEKALI
    res.cookie("token", token, { 
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    return res.status(200).json({ token, payload });
}

async function getAccountsAdmin(req,res){
    const getAccounts=await accountsAdmin.find({})
    if(getAccounts){
        res.status(200).send(getAccounts)
    }
    else{
        res.status(401).send('invalid to create Accounts')
    }
}
module.exports={createAccountsAdmin,loginAuthAdmin,getAccountsAdmin}