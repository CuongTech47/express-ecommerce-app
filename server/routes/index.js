

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// const authRouter = require('./auth')
const productRouter = require('./product')
const homeRouter = require('./home')
const adminRouter = require('./admin')
const categoryRouter = require('./category')
const brandRouter = require("./brand")
function route(app) {
  //frontend
 
  app.use("/",homeRouter)
  // app.use("/auth",authRouter)
  //backend
  
  app.use("/admin",adminRouter)
  app.use("/admin/category",categoryRouter)
  app.use("/admin/brand",brandRouter)
  app.use("/admin/product",productRouter)
  
  
}
module.exports = route;
