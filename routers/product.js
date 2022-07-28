const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


// Create 

router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
         res.status(500).json(error)
    }
});

//get products 

router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get product specific
router.get('/find/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }


});

// delete Product
router.delete('/delete/:id', verifyTokenAndAdmin, async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.delete);
        res.status(200).json('SuccessFully Deleted');
    } catch (error) {
        res.status(500).json(error)
    }
  
});

//Update Product

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
      $updatedProduct =   await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
         res.status(200).json($updatedProduct);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;