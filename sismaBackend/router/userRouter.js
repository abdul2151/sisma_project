const app = require('express')
const userRouter= app.Router()
const userControllers= require('../controllers/accounts/userControllers')


userRouter.get('/',userControllers.getAccountsMahasiswa)
userRouter.post('/login',userControllers.loginAuthMahasiswa)
userRouter.post('/registers',userControllers.createAccountsMahasiswa)

module.exports=userRouter