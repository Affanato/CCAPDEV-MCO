const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    classification: { type: String, required: true, enum: ['student', 'labtech'] },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: {type: String, default: ''}
}, { timestamps: true, collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
