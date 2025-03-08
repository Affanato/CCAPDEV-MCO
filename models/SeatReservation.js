const mongoose = require('mongoose');

const SeatReservationSchema = new mongoose.Schema ({
    groupID: {type:Number},
    seat: {type:String, required:true},
    lab: {type:String, required:true, enum:['GK101A', 'GK304A', 'GK304B', 'AG702', 'AG1904', 'LS209', 'LS311']},
    reqDate: {type:Date, required:true, default:Date.now},
    resDate: {type:Date, required:true},
    anon: {type:Boolean, required:true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'profile'},
    reservedStud: {type:Number}
});

module.exports = mongoose.model('SeatReservation', SeatReservationSchema);