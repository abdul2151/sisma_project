   const {authMiddleware} = require('../middleware/authmiddleware')
   const {checkRole}=require('../middleware/checkRole')
   const adminControllersPemits=require('../controllers/premits/premitsAcceptContollers')
   
    const app = require('express')
    const router = app.Router()
router.get('/',authMiddleware,adminControllersPemits.getPremitsAccepted)
router.post('/pushData',authMiddleware,adminControllersPemits.pushPremitsToAccepted)

module.exports=router
    