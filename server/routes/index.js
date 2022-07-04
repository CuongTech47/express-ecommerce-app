

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// const authRouter = require('./auth')
const homeRouter = require('./home')
const adminRouter = require('./admin')
const categoryRouter = require('./category')
function route(app) {
  //frontend
 
  app.use("/",homeRouter)
  // app.use("/auth",authRouter)
  //backend
  
  app.use("/admin",adminRouter)
  app.use("/admin/category",categoryRouter)
  
}
module.exports = route;
