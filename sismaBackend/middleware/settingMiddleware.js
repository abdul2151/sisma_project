function settingMiddleware(req,res,next){
res.append('Content-Type', 'application/javascript; charset=UTF-8');
res.append('Connection', 'keep-alive')
res.append('Set-Cookie', 'divehours=fornightly')
res.append('Content-Length', '5089990');
next()
}

module.exports=settingMiddleware