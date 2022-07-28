const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [   //here you can check it is array
    {
        productId: {
            type: String,
        },
        quantity:{
            type: Number,
            default: 1,
        },
    },
   
    ],
 
}, {timestamps: true}
);

module.exports = mongoose.model('Cart', CartSchema);