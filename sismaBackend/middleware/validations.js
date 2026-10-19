const accountsMahasiswa=require('../models/accountsMahasiswa')
const accountsAdmin = require('../models/accountsAdmin')
const jwt= require('jsonwebtoken')
const bcrypt=require('bcrypt')
async function validationsMahasiswa(req, res, next) {
  try {
    const { user, pass } = req.body;
    const filterUsername = await accountsMahasiswa.findOne({ username: user });
    const filterPassword = bcrypt.compareSync(pass, filterUsername.password);

    if (filterUsername && filterPassword) {
      const datas = { id: filterUsername._id, roles:filterUsername.role};

      const token = jwt.sign(datas, process.env.Secret_Token, { expiresIn: "1h" });

      const cookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      };

      res.cookie("token", token, cookieOptions);
      next() // ⬅️ pakai return, jangan panggil next()
    }

    return res.status(401).send("Username atau password salah");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function validationsAdmin(req, res, next) {
  try {
    const { user, pass } = req.body;
    const filterUsername = await accountsAdmin.findOne({ username: user });

    if (!filterUsername) {
      return res.status(401).send("Username tidak ditemukan");
    }

    const matchPassword = bcrypt.compareSync(pass, filterUsername.password);

    if (!matchPassword) {
      return res.status(401).send("Password salah");
    }

    // Kalau username & password valid
    const datas = { id: filterUsername._id, roles: filterUsername.role };

    const token = jwt.sign(datas, process.env.Secret_Token, { expiresIn: "1h" });

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    };

    res.cookie("token", token, cookieOptions);
    return next();

  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: err.message });
  }
}

module.exports={validationsAdmin,validationsMahasiswa}
