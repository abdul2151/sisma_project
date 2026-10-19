// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try{
//       const token = req.cookies.token; // ⬅️ ambil dari cookie
//     console.log(token)
//     if (!token) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.Secret_Token);
//     req.user = decoded; // { id, role, ... }

//     next();
//   }
//   catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = { authMiddleware };

