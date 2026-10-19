const imgProfile = require('../../models/img.js')


 async function newImg(req,res){
    const {nama,ukuran,link} =req.body 
    try{
        const postImg=new imgProfile({
            filename:nama,
            size:ukuran,
            url:link
        })
        if(postImg){
            await new imgProfile.save()
            res.json({
                status:200,
                postImg
            })
        }
        else{
            res.status(401).send('invalid post img')
        }
    }
    catch{
        res.status(404)
    }
}

async function getImg(req,res){
    const getImg= imgProfile.find({})
    res.status(200).send(getImg)
}
module.exports={newImg,getImg}