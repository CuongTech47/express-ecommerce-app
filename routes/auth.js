const express = require("express")
const router = express.Router()

const authController = require ("../controllers/AuthController")
const checkAuth = require("../middlewares/auth")

router.post("/login",authController.login)
router.post("/register", authController.register)
router.delete("/delete/:adminId",checkAuth,authController.deleteAdmin)
module.exports = router