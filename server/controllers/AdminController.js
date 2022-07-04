const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const flash = require("connect-flash");

class AdminController {
  index(req, res) {
    res.render("pages/admin_login", { title: "Admin Login", layout: false });
  }
  login(req, res) {
    const { admin_email, admin_password } = req.body;

    Admin.findOne({ admin_email }, (err, adminData) => {
      console.log("trying to find user");
      if (err) {
        console.log("Lỗi khi tìm dữ liệu từ cơ sở dữ liệu");
        console.log(err);
        res.render("pages/admin_login", { layout: false });
      } else {
        if (!adminData) {
          console.log("Email không chính xác");
          console.log(err);
          res.render("pages/admin_login", { layout: false });
        } else {
          console.log(adminData);
          // // so sanh mat khau
          bcrypt.compare(
            admin_password,
            adminData.admin_password,
            (err, isEqual) => {
              if (err) {
                console.log("Mật khẩu đối sánh lỗi");
                res.render("pages/admin_login", { layout: false });
              } else {
                if (isEqual == false) {
                  errors.push({ msg: "mật khẩu không đúng" });
                  res.render("pages/admin_login", { layout: false });
                } else {
                  const payload = {
                    adminId: adminData._id,
                  };
                  const oneDay = 60 * 60 * 24;
                  console.log(
                    "cả email và mật khẩu đều phù hợp, bạn đã đăng nhập ngay bây giờ"
                  );
                  jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: oneDay * 2 },
                    (err, token) => {
                      res.cookie("jwt", token, {
                        maxAge: oneDay * 3,
                        httpOnly: true,
                      });
                      res.redirect('/admin/dashboard');
                    }
                  );
                }
              }
            }
          );
        }
      }
    });
  }
  dashboard(req, res) {
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
            console.log('decodedAdmin',decodedAdmin)
            Admin.findById(decodedAdmin.adminId, (err, adminData) => {
              const admin_name = adminData.admin_name;
             
              res.render('admin/admin_dashboard',{ admin_name})
            });
          }
        }
      );
    } else {
      const admin_name = "Unknown";
      res.render("admin/admin_dashboard" ,{ admin_name});
    }
  }
  logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect("/admin/login")
  }
}
module.exports = new AdminController();
