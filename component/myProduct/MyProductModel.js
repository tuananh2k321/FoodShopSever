const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myProductSchema = new Schema({
    id: { type: Schema.Types.ObjectId, }, // kh óa chính
    name: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', require: true, },
    description: { type: String, },
    brand: { type: String, default: "Food & Drink co" },
    image: { type: String, default: "" },
    stock: { type: Number, default: 99 },
    mfg: { type: Date, default: Date.now },
    exp: {
        type: Date, default: () => {
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(currentDate.getDate() + 14);
            return expirationDate;
        }
    },
    rating: { type: Number, default: 0 },
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user', default: "" },
        comment: { type: String, default: "I love it" },
        rating: { type: Number, default: 5 }
    }]
});
module.exports = mongoose.models.myProduct || mongoose.model('myProduct', myProductSchema);
// category -----> categories
