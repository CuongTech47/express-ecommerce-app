const jwt = require("jsonwebtoken");
const secretKey = "dsahkdshakhdsa";
module.exports = (req, res)=> {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, secretKey);

    req.adminData = decoded;
    next();
  } catch (error) {
    return error
    
  }
}


