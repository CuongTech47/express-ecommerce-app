const Brand = require("../models/Brand");
const jwt = require("jsonwebtoken");
const { multipleMongooseToObject ,  mongooseToObject } = require("../util/mongoose");
const Admin = require("../models/Admin")
class BrandController {
  addBrand(req, res) {
    
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
              res.render("admin/add_brand", { admin_name });
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/add_brand", { admin_name });
    }
  }
  async allBrand(req, res) {
    const brands = await Brand.find();

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
              console.log(brands);
              res.render("admin/all_brand", {
                admin_name,
                brands: multipleMongooseToObject(brands),
              });
              
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/all_brand", { admin_name });
    }
  }
  async postAddBrand(req, res) {
    
    
    // console.log(req.body);
    try {
      const newBrand = new Brand(req.body);
      const savedBrand = await newBrand.save();
      res.render("admin/add_brand", {
        message: " them thuong hieu san pham thanh cong",
      });
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }
 async editBrand(req, res) {
  const brand = await Brand.findById(req.params.id);
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
              res.render("admin/edit_brand", { 
                admin_name ,
                brand:  mongooseToObject(brand)});
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/edit_brand", { admin_name });
    }
  }
  async updateBrand(req, res) {
    try {
      const brand = await Brand.findById(req.params.id);
      await brand.updateOne({ $set: 
        req.body
      });
      res.redirect("/admin/brand/all-brand")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async unactiveBrand(req, res) {
    console.log(req.params.id)
    try {
      const brand = await Brand.findById(req.params.id);
     
      await brand.updateOne({
        $set: {brand_status : 0}
      });
      res.redirect("/admin/brand/all-brand")
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async activeBrand(req, res) {
    console.log(req.params.id)
    try {
      const brand = await Brand.findById(req.params.id);
     
      await brand.updateOne({
        $set: {brand_status : 1}
      });
      res.redirect("/admin/brand/all-brand")
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new BrandController();
