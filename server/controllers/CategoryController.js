

class CategoryController  {
    addCategory( req , res){
        res.render("admin/add_category",{title: "Them Danh Muc San Pham"})
    }
    allCategory( req , res) {
        res.render("admin/all_category",{title: "Liet Ke Danh Muc San Pham"})
    }
}

module.exports = new CategoryController