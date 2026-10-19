  const {authMiddleware} = require('../middleware/authmiddleware')
   const {checkRole}=require('../middleware/checkRole')
const mahasiswaControllers=require('../controllers/premits/premitsControllers')
 const adminControllersPemits=require('../controllers/premits/premitsAcceptContollers')
   
    const app = require('express')
    const router = app.Router()

    router.get('/',mahasiswaControllers.getPremits)
    router.get('/user/detail/:id',mahasiswaControllers.viewPremitsById)
    router.get('/user/:id',mahasiswaControllers.getPremitsByIdUser)
    router.post('/user/post',mahasiswaControllers.newPremits)
    router.post('/user/update/:id',mahasiswaControllers.updatePremits)
    router.delete('/user/delete/:id',mahasiswaControllers.deletePremits)


    router.get('/admin',adminControllersPemits.getPremitsAccepted)
    router.post('/admin/pushData',adminControllersPemits.pushPremitsToAccepted)
    

module.exports=router
    