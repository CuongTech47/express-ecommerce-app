

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const authRouter = require('./auth')
const homeRouter = require('./home')
const adminRouter = require('./admin')
function route(app) {
  //frontend
  app.use("/",homeRouter)
  app.use("/auth",authRouter)
  //backend
  app.use("/",adminRouter)
}
module.exports = route;
