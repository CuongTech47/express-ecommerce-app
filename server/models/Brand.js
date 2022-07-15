const mongoose = require("mongoose");

const Schema = mongoose.Schema
// const AutoIncrement = require('mongoose-sequence')(mongoose)
const BrandSchema = new Schema({
    brand_name:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    brand_desc:{
        type:String,
        min:6,
        max : 255,
        require: true
    },
    brand_status:{
        type:Number,
        require: true
    },
    brand_slug: {
        type:String,
        min:6,
        max : 255,
        require: true
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
        
    ]
},{
    // _id : false,
    timestamps : true

})

// Brand.plugin(AutoIncrement, {id : 'brand_id_couter'})
module.exports = Brand =  mongoose.model("brand",BrandSchema)