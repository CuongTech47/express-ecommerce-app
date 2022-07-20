const mongoose = require("mongoose");



const Schema = mongoose.Schema
// const AutoIncrement = require('mongoose-sequence')(mongoose)
const ProductSchema = new Schema({
    product_name:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    product_image:{
        type:String,
        default: 'placeholder.jpg'
    },
    product_desc:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    product_price:{
        type:Number,
        require: true
    },
    product_status:{
        type:Number,
        require: true
    },
    product_slug:{
        type:String,
        min:6,
        max : 255,
        require: true

    },
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'brand'
    }
},{
    // _id : false,
    timestamps : true

})

// Product.plugin(AutoIncrement, {id : 'product_id_couter'})
module.exports = Product= mongoose.model("product",ProductSchema)