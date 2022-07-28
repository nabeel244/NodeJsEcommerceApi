const Order = require('../models/Order');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');

const router = require('express').Router();


// Create 

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
         res.status(500).json(error)
    }
});

//get all 

router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//get Order specific cart
router.get('/find/:userId', verifyTokenAndAdmin, async(req, res) => {
    try {
        const Order = await Order.find({userId:req.params.userId});
        res.status(200).json(Order);
    } catch (error) {
        res.status(500).json(error);
    }


});

// delete Cart
router.delete('/delete/:id', verifyTokenAndAdmin, async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.delete);
        res.status(200).json('SuccessFully Deleted');
    } catch (error) {
        res.status(500).json(error)
    }
  
});

//Update Order

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
      $updateOrder =   await Order.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
         res.status(200).json($updateOrder);
    } catch (error) {
        res.status(500).json(error)
    }
});


// get Monthly income

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();   // current date
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));  // previous one month of current month 
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));  //2 months ago on current month

    try {
       const income = await Order.aggregate([
        {$match: {createdAt: {$gte: previousMonth}}},
        {
        $project: {
            month: {$month: "$createdAt"},
            sales: "$amount",
        },
    },
        {
            $group: {
                _id: "$month",
                total:{$sum:"$sales"},
            },
        },
   
    ]);
    res.status(200).json(income);
    } catch (err){
            res.status(500).json(err);
    }
});

module.exports = router;