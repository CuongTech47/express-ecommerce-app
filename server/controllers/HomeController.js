class HomeController {
    index(req , res) {
        res.render('home', { title: "Home | E-Shopper" , layout : false});
    }
}

module.exports = new HomeController