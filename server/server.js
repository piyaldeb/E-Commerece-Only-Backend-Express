const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config();

const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Mongodb connected"))
.catch(err=> console.error("Database error" , err));

const port= process.env.PORT || 5000
app.listen(port , ()=>{
    console.log(`Server is connected ${port}`)
})