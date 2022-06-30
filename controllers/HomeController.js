class HomeController {
    index(req , res) {
        res.render('index', { title: "Home | E-Shopper" , layout : false});
    }
}

module.exports = new HomeController