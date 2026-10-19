const accountsMahasiswa=require('../../models/accountsMahasiswa')
const jwt= require('jsonwebtoken')
const bcrypt=require('bcrypt')
const {generateToken,decodeToken}= require('../token/generateToken')


async function createAccountsMahasiswa(req,res){
    try{
const {nama,nimMhs,kelas,user,pass,mail}=req.body 
    if(nama==='' || nimMhs===''  || kelas===''|| user==='' || pass ==='' || mail===''){
       return res.status(300).send('input belum terisi semua')
    }
    else{
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
                return res.status(200).send('sukses to create Accounts')
            }
            else{
                return res.status(401).send('invalid to create Accounts')
            }
        }
    }
        catch(err){
           return res.status(404).send(err)

        }
    
}


async function loginAuthMahasiswa(req, res) {
    const { user, pass } = req.body;

    // Cari user 1 orang saja
    const authUsername = await accountsMahasiswa.findOne({ username: user });

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
    const dataDecode = decodeToken(token);

    if (!token) {
        return res.status(300).send('invalid to generate token');
    }

    // Kirim response hanya SEKALI
    // res.cookie("token", token, { 
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax"
    // });

    return res.status(200).json({ token, payload, dataDecode });
}


async function getAccountsMahasiswa(req,res){
    const getAccounts=await accountsMahasiswa.find({})
    if(getAccounts){
        res.status(200).send(getAccounts)
    }
    else{
        res.status(401).send('invalid to create Accounts')
    }
}

module.exports={loginAuthMahasiswa,createAccountsMahasiswa,getAccountsMahasiswa}