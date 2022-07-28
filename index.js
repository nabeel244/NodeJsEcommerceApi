const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routers/user');
const authRoute =  require('./routers/auth');
const productRoute = require('./routers/product');
const cartRoute = require('./routers/cart');
const orderRoute = require('./routers/order');
app.use(express.json());             // yeh request body say data get krny kay liye use hoti ha
const dotenv = require('dotenv');   // for this npm i dotenv
dotenv.config();                   // manually create .env yeh config krta ha 
mongoose.connect(process.env.MONGO_URL)   // yeh process .env sy variable lata ha
.then(() =>
    console.log('DB Connection Successfully')
)
.catch((err) => {
    console.log(err)
});

app.use('/api/users',userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products' ,productRoute);
app.use('/api/carts' ,cartRoute);
app.use('/api/orders' ,orderRoute);

app.listen(process.env.PORT || 5000, () =>{
    console.log('server running successfully');
});