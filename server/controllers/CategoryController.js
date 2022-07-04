const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

class CategoryController  {
    addCategory( req , res){
        
        // res.render("admin/add_category")
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(
              token,
              process.env.ACCESS_TOKEN_SECRET,
              (err, decodedAdmin) => {
                if (err) {
                  console.log(err);
                  next(err);
                } else {
                  console.log('decodedAdmin',decodedAdmin)
                  Admin.findById(decodedAdmin.adminId, (err, adminData) => {
                    const admin_name = adminData.admin_name;
                    res.render("admin/add_category",{ admin_name})
                  });
                }
              }
            );
          } else {
            const admin_name = "Unknown";
            res.render("admin/add_category" ,{ admin_name});
          }
    }
    allCategory( req , res) {
       
        const token = req.cookies.jwt
        if (token) {
            jwt.verify(
              token,
              process.env.ACCESS_TOKEN_SECRET,
              (err, decodedAdmin) => {
                if (err) {
                  console.log(err);
                  next(err);
                } else {
                  console.log('decodedAdmin',decodedAdmin)
                  Admin.findById(decodedAdmin.adminId, (err, adminData) => {
                    const admin_name = adminData.admin_name;
                    res.render("admin/all_category",{ admin_name})
                  });
                }
              }
            );
          } else {
            const admin_name = "Unknown";
            res.render("admin/all_category" ,{ admin_name});
          }
    }
    postAddCategory(req , res) {
        const {category_name ,category_desc , category_status ,category_slug  } = req.body
        console.log(category_name ,category_desc , category_status ,category_slug)

    }
}

module.exports = new CategoryController