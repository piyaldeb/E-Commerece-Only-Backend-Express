// IMPORT asyncHandler
// IMPORT Order model




// EXPORT addOrderItems
// EXPORT getOrderById
// EXPORT updateOrderToPaid
// EXPORT getMyOrders
// EXPORT getOrders
const Order= require('../models/Order');

// FUNCTION addOrderItems(req, res)
//     EXTRACT orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice FROM req.body
//     IF orderItems IS EMPTY
//         SET res.status TO 400
//         THROW new Error 'No order items'
//     ELSE
//         CREATE new Order WITH orderItems, user ID from req, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
//         SAVE order TO DATABASE
//         SET res.status TO 201
//         RETURN createdOrder AS JSON
exports.addOrderItems= async(req,res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice}=req.body;
    try{
        if(orderItems && orderItems.length==0){
            return res.status(404).json({
                message:"No order items"
            });
        }
        const order=new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json({
            message:"Order created successfully!!",createdOrder
        })
    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }
}

// FUNCTION getOrderById(req, res)
//     FIND order BY req.params.id
//     POPULATE user WITH name, email
//     IF order EXISTS
//         RETURN order AS JSON
//     ELSE
//         SET res.status TO 404
//         THROW new Error 'Order not found'

exports.getOrderById = async (req,res)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');
    try{
        if(order){
           return res.json(order);
        }
        else{
           return res.json("Not found")
        }
    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }
}

// FUNCTION updateOrderToPaid(req, res)
//     FIND order BY req.params.id
//     IF order EXISTS
//         SET order.isPaid TO true
//         SET order.paidAt TO current date and time
//         SET order.paymentResult TO { id, status, update_time, email_address } FROM req.body
//         SAVE updatedOrder TO DATABASE
//         RETURN updatedOrder AS JSON
//     ELSE
//         SET res.status TO 404
//         THROW new Error 'Order not found'

exports.updateOrderToPaid = async(req,res)=>{
    const order= await Order.findById(req.params.id);
    try{
        if(order){
            order.isPaid = true;
            order.paidAt= Date.now();
            order.paymentResult ={
                id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
            }
            const updatedOrder = await order.save();
            return res.json(updatedOrder);
           
        } else{
            return res.status(404).json({
                error:"Not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }
}


// FUNCTION getMyOrders(req, res)
//     FIND orders BY req.user._id
//     RETURN orders AS JSON

exports.getMyOrders = async(req,res)=>{
    try{
    const orders = await Order.find({user:req.user._id});
    res.json(orders);

    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }

}

// FUNCTION getOrders(req, res)
//     FIND all orders
//     POPULATE user WITH id, name
//     RETURN orders AS JSON

exports.getOrders = async(req,res)=>{
    const orders = await Order.find({}).populate('user','id name');
    try{
        res.json(orders);

    }catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }
}