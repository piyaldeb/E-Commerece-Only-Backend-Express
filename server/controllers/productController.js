// Function getProducts:
//     Execute async handler
//     Find all products
//     Return products as JSON response

// Function getProductById:
//     Execute async handler
//     Find product by ID from request parameters
//     If product exists:
//         Return product as JSON response
//     Else:
//         Return 404 error with message 'Product not found'

// Function createProduct:
//     Execute async handler
//     Create a new product with default values and user ID from request
//     Save the new product
//     Return the created product with status 201

// Export the following functions:
//     - getProducts
//     - getProductById
//     - createProduct
//     - updateProduct
//     - deleteProduct

const Product =require('../models/Product')

exports.getProducts = async(req,res)=>{
    const products = await Product.find({});
    try{
        if(products){
            res.status(200).json({
                products
            })
        }
    }catch(err){
        res.status(500).json({
            error:"Server error"
        });
    }
}

exports.getProductById=async(req,res)=>{
    const product=await Product.findById(req.params.id);
    try{
        if(product){
           return res.status(200).json({
                product
            })
        }else{
            return res.status(404).json({
                message:"Product not found!"
            });
        }
    }catch(err){
        res.status(404).json({
            error:"Server error!!"
        });
    }
}

exports.createProduct = async(req,res)=>{
    const{name,description,price,countInStock,imageUrl,brand,category,numReviews}=req.body;
    try{
    const product =  new Product({
        name,
        description,
        price,
        countInStock,
        imageUrl,
        user: req.user._id,
        brand,
        category ,
        numReviews
        

    });
    const createProduct=await product.save();
    return res.status(201).json(createProduct);
}   catch(err){
     res.status(404).json({
        error:"Server error!!"
        });
}
}

// Function updateProduct:
//     Execute async handler
//     Extract product details from request body
//     Find product by ID from request parameters
//     If product exists:
//         Update product details with values from request body
//         Save the updated product
//         Return the updated product as JSON response
//     Else:
//         Return 404 error with message 'Product not found'

exports.updateProduct = async (req,res)=>{
    const {name, price, description, image, brand, category, countInStock} = req.body;
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.description = req.body.description || product.description;
            product.imageUrl = req.body.image || product.imageUrl; // Ensure the field name matches your schema
            product.brand = req.body.brand || product.brand;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock || product.countInStock;
            
            const updateProduct = await product.save();
           return res.json(updateProduct)
        }else{
            return res.status(404).json({
                mesaage:"Product not found"
            })
        }

    }catch(err){
        res.status(500).json({
            error:"Server error"
        })
    }
}

//Function deleteProduct:
//     Execute async handler
//     Find product by ID from request parameters
//     If product exists:
//         Remove the product
//         Return success message 'Product removed'
//     Else:
//         Return 404 error with message 'Product not found'

exports.deleteProduct = async (req,res)=>{
    const product = await Product.findById(req.params.id);
    try{
        if(!product){
            return res.status(404).json({
                message:"Not found!"
            })
        }
        await product.remove();
        return res.status(200).json({
            message:"Product removed"
        });
    }catch(err){
        res.status(500).json({
            error:"Server error"
        })
    }
}