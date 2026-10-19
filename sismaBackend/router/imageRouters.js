const app = require('express')
const router= app.Router()

const {newImg,getImg} = require('../controllers/accounts/imgAccountsControllers')

router.post('/img',newImg)
router.get('/img',getImg)


module.exports =router