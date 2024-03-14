const  mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    userName:{type:String ,},
    email :{ type : String,},
    password : { type : String,},
}) ;

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        },
        process.env.JWT_SECRET_KEY
        );
    } catch (error) {
        console.error(error);
    }
}


const User = mongoose.model('User',userSchema);

module.exports =User;