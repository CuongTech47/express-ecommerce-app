const express = require("express")
const router = express.Router()


const brandController = require("../controllers/BrandController")
const isAuth = require("../middlewares/auth")

router.get("/add-brand",isAuth.reqAuthentication,brandController.addBrand)
router.get("/all-brand",isAuth.reqAuthentication,brandController.allBrand)

router.post("/add-brand",brandController.postAddBrand)

router.get("/edit-brand/:id",isAuth.reqAuthentication,brandController.editBrand)
router.put("/update-brand/:id",brandController.updateBrand)
router.get("/unactive-brand/:id",brandController.unactiveBrand)
router.get("/active-brand/:id",brandController.activeBrand)


module.exports = router