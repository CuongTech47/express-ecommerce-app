const jwt = require("jsonwebtoken");

module.exports = (req, res ,next)=> {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.adminData = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    res.sendStatus(401)

  }
}


