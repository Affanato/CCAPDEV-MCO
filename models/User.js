const mongoose = require('mongoose');

const UserSchema = new Schema ({
    IDno: {type:Number},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    img: {type:String, required:true},
    type: {type:String, required:true, enum:['Student', 'Lab Technician']},
    bio: {type:String},
    email: {type:String, required:true},
    salt: { type: String, required:true },
    hashedPassword: { type: String, required:true },
    rem: {type:Boolean, required:true},
    lastLogin: {type:Date, default:Date.now}
});

module.exports = mongoose.model('User', UserSchema);