const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser= require('body-parser')
const app = express()
const upload = require('./middleware/multerImg.js')
const connectDB = require('./config/config.js')
const settingMiddleware=require('./middleware/settingMiddleware')
const adminRouter = require('./router/adminRouter.js')
require('dotenv').config()
// settings 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// app.options(/.*/, cors());
app.options(/^\/api\/.*$/, cors());
app.use(morgan('dev'))
app.use(settingMiddleware)
connectDB()

// routing
app.use('/admin',adminRouter)
app.use('/user',require('./router/userRouter.js'))
app.use('/premits',require('./router/premitsService'))
// app.use('/premits/accepted',require('./router/premitsAcceptService'))
app.use('/upload/img',upload.single('img'),require('./router/imageRouters.js'))

app.listen(8001,()=>{
    console.log('http://localhost:8001')
})

module.exports=app