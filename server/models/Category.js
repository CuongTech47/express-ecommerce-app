const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    category_name:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    category_desc:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    category_status:{
        type:Number,
        require: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
},{
    // _id : false,
    timestamps : true

})

module.exports = Category = mongoose.model("category",CategorySchema)