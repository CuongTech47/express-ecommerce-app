const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const { multipleMongooseToObject ,  mongooseToObject } = require("../util/mongoose");
const Admin = require("../models/Admin")
class CategoryController {
  addCategory(req, res) {
    // res.render("admin/add_category")
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
              res.render("admin/add_category", { admin_name });
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/add_category", { admin_name });
    }
  }
  async allCategory(req, res) {
    const categories = await Category.find();

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
              console.log(categories);
              res.render("admin/all_category", {
                admin_name,
                categories: multipleMongooseToObject(categories),
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
  async postAddCategory(req, res) {
    const { category_name, category_desc, category_status, category_slug } =
      req.body;
    console.log(req.body);
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.render("admin/add_category", {
        message: " them thuong hieu san pham thanh cong",
      });
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
 async editCategory(req, res) {
  const category = await Category.findById(req.params.id);
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
              res.render("admin/edit_category", { 
                admin_name ,
                category:  mongooseToObject(category)});
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/edit_category", { admin_name });
    }
  }
  async updateCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      await category.updateOne({ $set: 
        req.body
      });
      res.redirect("/admin/category/all-category")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async unactiveCategory(req, res) {
    console.log(req.params.id)
    try {
      const category = await Category.findById(req.params.id);
     
      await category.updateOne({
        $set: {category_status : 0}
      });
      res.redirect("/admin/category/all-category")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async activeCategory(req, res) {
    console.log(req.params.id)
    try {
      const category = await Category.findById(req.params.id);
     
      await category.updateOne({
        $set: {category_status : 1}
      });
      res.redirect("/admin/category/all-category")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async deleteCategory(req , res) {
    try {
      await Category.DeleteOne({_id : req.params.id})
      res.redirect("/admin/category/all-category")
  } catch (error) {
      res.status(500).json(error)
  }
  }
}

module.exports = new CategoryController();
