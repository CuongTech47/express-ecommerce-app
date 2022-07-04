const express = require("express")
const router = express.Router()

const adminController = require ("../controllers/AdminController")

const isAuth = require("../middlewares/auth")
router.get("/login",isAuth.notReqAuthentication,adminController.index)
router.post("/login",adminController.login)
router.get("/dashboard",isAuth.reqAuthentication,adminController.dashboard)
router.get("/logout",adminController.logout)
//
// router.get("/testToken",isAuth.accessToken,adminController.testToken)

module.exports = router