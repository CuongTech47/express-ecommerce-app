const express = require("express")
const router = express.Router()

const adminController = require ("../controllers/AdminController")

router.get("/admin",adminController.index)
router.get("/dashboard",adminController.show_dashboard)
router.post("/admin-dashboard",adminController.dashboard)

module.exports = router