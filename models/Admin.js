const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    admin_name : String,
    admin_email : String,
    admin_password : String,
    admin_phone: String,
    created_at: {
        type: Date,
        default : Date.now()
    }
})

module.exports = Admin = mongoose.model("admin",AdminSchema)