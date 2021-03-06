const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

  const reqAuthentication = (req, res, next) => {
    // GETTING TOKEN FROM BROWSER
    const token = req.cookies.jwt;
    // VERIFYING USER - IF USER PASS THEN USER ABLE TO VISIT PARTICLUR ROUTE
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      // FAIELD TO VERIFY TOKEN USER NEED TO LOGIN TO CREATE NEW ACCESS TOKEN
      if (err) {
        console.log("There is no token error: ", err.message);
        res.redirect('/admin/login');
      } else {
        // IF VERIFY SUCCESS ALLOW USER TO VISIT PARTICULAR ROUTE
        console.log("decoded token", decodedToken);
        next();
      }
    });
  }
  const notReqAuthentication = (req, res, next) => {
    // VERIFYING USER
    const token = req.cookies.token;
    // IF THERE IS A TOKEN NAME WITH JWT THEN IT IT WON'T LET USER GO SOME ROUTE
    if (token) {
      console.log("There is an token");
      res.redirect('/admin/dashboard');
    } else {
      // IF THERE IS NO TOKEN THEN USER ALLOW TO VISIT CERTAIN ROUTE
      console.log("There is no token ");
      next();
    }
  }
  const checkAuthentication = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                // IF THERE IS A TOKEN BUT UNVERIFIED SETTING USER VARIABLE AS NULL
                res.locals.user = null;
                next();
            } else {
                console.log("Decoded Token: ", decodedToken);
                User.findById(decodedToken.id, (error, docs) => {
                    if (error) {
                        console.log(error);
                        next();
                    } else {
                        // IF THERE IS A TOKEN AND VERIFIED IT WILL SET AN USER VARIABLE AND ALLOW VIEW ENGINE TO USE THIS VARIABLE
                        res.locals.user = docs;
                        next();
                    }
                })
            }
        });
    } else {
       // IF THERE IS NO TOKEN SETTING USER VARIABLE AS NULL
        res.locals.user = null;
        next();
    }
}
  
module.exports = {
  reqAuthentication,
  notReqAuthentication,
  checkAuthentication

}

