const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes.js');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const orderRoutes = require('./routes/orderRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error)=>console.log(error))



    



app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`)
});
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/user',userRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));
app.use('/orders', orderRoutes);
app.use('/', searchRoutes);


app.use('/', (req, res)=>{
    res.send('<h1> Welcome to Quick Bites');
})





