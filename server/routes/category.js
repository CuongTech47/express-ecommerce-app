const express = require("express")
const router = express.Router()


const categoryController = require("../controllers/CategoryController")
const isAuth = require("../middlewares/auth")

router.get("/add-category",isAuth.reqAuthentication,categoryController.addCategory)
router.get("/all-category",isAuth.reqAuthentication,categoryController.allCategory)

router.post("/add-category",categoryController.postAddCategory)

router.get("/edit-category/:id",isAuth.reqAuthentication,categoryController.editCategory)
router.put("/update-category/:id",categoryController.updateCategory)
router.get("/unactive-category/:id",categoryController.unactiveCategory)
router.get("/active-category/:id",categoryController.activeCategory)
router.delete("/delete-category/:id",categoryController.deleteCategory)


module.exports = router