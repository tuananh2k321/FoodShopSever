const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartItemSchema = new Schema({
    productId: {
        type: ObjectId,
        ref: 'myProduct',
        required: true
    },
    quantity: { type: Number, default: "1" },

});

const cartSchema = new Schema({
    id: {
        type: ObjectId,
    },
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    items: [cartItemSchema]
});

module.exports = mongoose.models.cart || mongoose.model('cart', cartSchema);
