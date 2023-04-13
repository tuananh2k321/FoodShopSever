const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role :{type :Number,default:1},
    //1 user
    //100 admin

});

module.exports =  mongoose.models.user || mongoose.model('user', userSchema);
//trong đây là số ít bên mông là số nhiều