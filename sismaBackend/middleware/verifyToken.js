const jwt = require('jsonwebtoken')

function authorizationRole(role){
    return (req,res,next)=>{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.Secret_Token, (err, decoded) => {
          if (err) return res.status(403).json({ message: 'Unauthorized' });
          if (decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
          req.user = decoded;
          next();
        });
    }
}

module.exports=authorizationRole
