class AdminController {
    index(req , res ) {
        res.render('admin_login', { title: "Admin Login" , layout : false});
    }
    show_dashboard(req , res) {
        let locals = {
            title: 'admin dashboard',
            layout : './admin_layout'
        }
        res.render('admin/admin_dashboard',locals)
    }
    dashboard(req , res) {
       res.sendStatus(200)
    }
}
module.exports = new AdminController