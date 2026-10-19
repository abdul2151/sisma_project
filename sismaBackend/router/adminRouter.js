const app = require('express')
const adminRouter= app.Router()
const adminControllres=require('../controllers/accounts/adminControllers')
const {validationsAdmin}=require('../middleware/validations')
const {hasingAdmin} = require('../middleware/hasing')


adminRouter.get('/',adminControllres.getAccountsAdmin)
adminRouter.post('/login',adminControllres.loginAuthAdmin)
adminRouter.post('/registers',hasingAdmin,adminControllres.createAccountsAdmin)

module.exports=adminRouter