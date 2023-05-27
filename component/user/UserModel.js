const mongoose = require('mongoose');
const { array } = require('../../MiddleWare/UpLoadImage');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var currentdate = new Date();
var datetime = currentdate.getDate() + "/"
  + (currentdate.getMonth() + 1) + "/"
  + currentdate.getFullYear() + " @ "
  + currentdate.getHours() + ":"
  + currentdate.getMinutes() + ":"
  + currentdate.getSeconds();

const userSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  address: {
    country: { type: String, default: "Viet Nam" },
    city: { type: String, default: "Ho Chi Minh City" },
    address: { type: String, default: "" },
  },
  email: { type: String, default: "", unique: true },
  gender: { type: Boolean, default: true },//true female false male
  dob: { type: Date, default: Date.now },
  avatar: { type: String, default: "" },
  createAt: { type: Date, default: Date.now },
  role: { type: Number, default: 1 },
  isVerified: { type: Boolean , default: false},
  verificationCode: { type: String },
  // cart: { type: ObjectId, ref: 'cart' }
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
