const express = require("express")
const router = express.Router()


const categoryController = require("../controllers/CategoryController")

router.get("/add-category",categoryController.addCategory)
router.get("/all-category",categoryController.allCategory)


module.exports = router