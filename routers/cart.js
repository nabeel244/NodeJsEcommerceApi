const Cart = require('../models/Cart');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');

const router = require('express').Router();


// Create 

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
         res.status(500).json(error)
    }
});

//get all 

router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get product specific cart
router.get('/find/:userId', verifyTokenAndAuthorization, async(req, res) => {
    try {
        const Cart = await Cart.find({userId:req.params.userId});
        res.status(200).json(Cart);
    } catch (error) {
        res.status(500).json(error);
    }


});

// delete Cart
router.delete('/delete/:id', verifyTokenAndAuthorization, async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.delete);
        res.status(200).json('SuccessFully Deleted');
    } catch (error) {
        res.status(500).json(error)
    }
  
});

//Update Cart

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
      $updateCart =   await Cart.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
         res.status(200).json($updateCart);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;