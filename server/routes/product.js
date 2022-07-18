const express = require("express");
const router = express.Router();
const multer = require("multer");



const productController = require("../controllers/ProductController");
const isAuth = require("../middlewares/auth");
const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
      callback(null, 'public/frontend/images/home/');
    },
  
    //add back the extension
    filename: function (req, file, callback) {
      let fileOriginalName = file.originalname
      let fileStr = fileOriginalName.replace(/\s/g, '')

      callback(null, Date.now() + fileStr);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
    
  });
router.get(
  "/add-product",
  isAuth.reqAuthentication,
  productController.addproduct
);
// router.get("/all-category",isAuth.reqAuthentication,categoryController.allCategory)

router.post("/add-product", upload.single("product_image"),productController.postAddProduct);

// router.get("/edit-category/:id",isAuth.reqAuthentication,categoryController.editCategory)
// router.put("/update-category/:id",categoryController.updateCategory)
// router.get("/unactive-category/:id",categoryController.unactiveCategory)
// router.get("/active-category/:id",categoryController.activeCategory)
// router.delete("/delete-category/:id",categoryController.deleteCategory)

module.exports = router;
