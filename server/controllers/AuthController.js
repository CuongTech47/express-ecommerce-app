// const bcrypt = require("bcrypt");
// const { response } = require("express");
// const Admin = require("../models/Admin");
// const jwt = require("jsonwebtoken");

// const dotenv = require("dotenv")
// dotenv.config()


// class AuthController {
//   async login(req, res) {
//     const { admin_email, admin_password } = req.body;

//     const admin = await Admin.findOne({ admin_email });

//     await Admin.findOne({ admin_email: req.body.admin_email })
//       .exec()
//       .then(admins => {
//         console.log(admins)
//         if (!admin) {
//           res.json({
//             message: "Người dùng không tồn tại",
//           });
//         } else {
//           //checkpassword
//           const passwordCompare = admins.admin_password;
//           bcrypt.compare(
//             req.body.admin_password,
//             passwordCompare,
//             (err, isEqual) => {
//               if (err) return res.sendStatus(401);
//               if (isEqual) {
//                 const payload = {
//                   admin_email: admins.admin_email,
//                   adminId: admins._id,
//                   admin_name: admins.admin_name,
//                   admin_phone: admins.admin_phone,
//                 };
//                 jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn : '1h'}, (err, token) => {
//                   if (err) console.log(err);
//                   else {
//                     return res.status(200).json({
//                       message: "Login thanh cong",
//                       token: token,
//                     });
//                   }
//                 });
//               } else {
//                 if (admin_password !== passwordCompare) {
//                   return res.json({
//                     message: "mật khẩu không đúng",
//                   });
//                 }
//               }
//             }
//           );
//           // if(admin_password !== admin.admin_password) {
//           //     return res.json({
//           //         message : "mật khẩu không đúng"
//           //     })
//           // }
//         }
//       });
//   }
//   async register(req, res) {
//     const { admin_name, admin_phone, admin_email, admin_password } = req.body;
//     const adminExists = await Admin.findOne({
//       admin_email,
//     });
//     if (adminExists) {
//       return res.json({
//         message: "Người dùng đã tồn tại",
//       });
//     } else {
//       bcrypt.hash(req.body.admin_password, 10, (err, hash) => {
//         if (err) {
//           return res.status(500).json({
//             error: err,
//           });
//         } else {
//           const newAdmin = new Admin({
//             _id : req.body._id,
//             admin_name: req.body.admin_name,
//             admin_email: req.body.admin_email,
//             admin_password: hash,
//             admin_phone: req.body.admin_phone,
//           });
//           newAdmin.save();
//           return res.json({newAdmin});
//         }
//       });
//     }
//   }
//   // Xóa admin
//   async deleteAdmin(req, res) {
//     await Admin.deleteOne({ _id: req.params.adminId })
//       .exec()
//       .then((response) => {
//         res.status(200).json({
//           message: "Xóa admin thanh cong",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           message: "Xoa khong thanh cong",
//           error: err,
//         });
//       });
//   }
// }
// module.exports = new AuthController();
