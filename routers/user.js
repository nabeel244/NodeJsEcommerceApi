const router = require('express').Router();
const User = require('../models/User');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
   if(req.body.password){
    req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        porcess.env.PASS_SEC
    ).toString();
   }
   try{
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
    }, {new: true});
    res.status(200).json(updateUser);
   }catch(err){
    res.status(500).json(err);
   }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req ,res) => {
    try {
     await User.findByIdAndDelete(req.params.id)
   res.status(200).json('User Deleted');
    } catch (err){
         res.status(500).json(err)
    }
});

//Get specific  User
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {  //only admin can get users
    try {
      const user =  await User.findById(req.params.id);
      const {password, ...others} = user._doc;  //spread operator updated and previous value ko lay kr aata ha
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
        
    }
})

//Get all  Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {  //only admin can get users
    try {
      const users =  await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
        
    }
});

//Get USER STATS
router.get('/stats', verifyTokenAndAdmin, async(req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group:{             //this is raw group
                    _id: "$month",    //it is mont not id   
                    total: {$sum: 1}
                },
            },
        
        ]);
        res.status(200).json(data);
    } catch (error) {
        console.log('errrr');
        res.status(500).json(error);
    }
});

// router.post('/userposttest', (req, res) =>{
//     const username = req.body.username;
//     res.send("username is " + username)
// });

module.exports = router;