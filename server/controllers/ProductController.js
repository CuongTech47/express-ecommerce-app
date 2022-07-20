const Category = require("../models/Category");
const Brand = require("../models/Brand");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class ProductController {
  async addproduct(req, res) {
    const token = req.cookies.jwt;
    const category_product = await Category.find();
    const brand_product = await Brand.find();
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedAdmin) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            console.log("decodedAdmin", decodedAdmin);
            Admin.findById(decodedAdmin.adminId, (err, adminData) => {
              const admin_name = adminData.admin_name;
              res.render("admin/add_product", {
                admin_name,
                category_product: multipleMongooseToObject(category_product),
                brand_product: multipleMongooseToObject(brand_product),
              });
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/add_product", { admin_name });
    }
  }
  async postAddProduct(req, res) {
    console.log(req.body)
    try {
      const newProduct = new Product({
        product_name: req.body.product_name,
        product_image: req.file.filename,
        product_desc: req.body.product_desc,
        product_status: req.body.product_status,
        product_price: req.body.product_price,
        product_slug: req.body.product_slug,
        category: req.body.category,
        brand: req.body.brand,
      });
      const savedProduct = await newProduct.save();
      if (req.body.category) {
        const category = Category.findById(req.body.category);
        await category.updateOne({ $push: { products: savedProduct._id } });
      }
      if (req.body.brand) {
        const brand = Brand.findById(req.body.brand);
        await brand.updateOne({ $push: { products: savedProduct._id } });
      }
      res.render("admin/add_product", {
        message: " them san pham thanh cong",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async allProduct(req , res) {
    const products = await Product.find()
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedAdmin) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            console.log("decodedAdmin", decodedAdmin);
            Admin.findById(decodedAdmin.adminId, (err, adminData) => {
              const admin_name = adminData.admin_name;
              
              res.render("admin/all_product", {
                admin_name,
                products: multipleMongooseToObject(products),
                
                
              });
             
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/all_category", { admin_name });
    }
  }
  async editProduct(req , res) {
    const product = await Product.findById(req.params.id).populate('category').populate('brand')
    const category_product = await Category.find().populate('products')
    const brand_product = await Brand.find();
   
   
  //  console.log(category_product)
   for (const iterator of category_product) {
   
    for (const iterator1 of iterator.products) {
      console.log(iterator1.category)
    }
   
    
   }

    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedAdmin) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            console.log("decodedAdmin", decodedAdmin);
            Admin.findById(decodedAdmin.adminId, (err, adminData) => {
              const admin_name = adminData.admin_name;
              res.render("admin/edit_product", { 
                admin_name ,
                product : mongooseToObject(product),
                category_product: multipleMongooseToObject(category_product),
                brand_product: multipleMongooseToObject(brand_product),
               
               });
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/edit_category", { admin_name });
    }
  }
}

module.exports = new ProductController();
