const express = require("express")
const router = express.Router()


const categoryController = require("../controllers/CategoryController")
const isAuth = require("../middlewares/auth")

router.get("/add-category",isAuth.reqAuthentication,categoryController.addCategory)
router.get("/all-category",isAuth.reqAuthentication,categoryController.allCategory)

router.post("/add-category",categoryController.postAddCategory)


module.exports = router