const router = require('express').Router();
const verify = require('./verifyToken');
const Student = require('../models/Student');
const User = require('../models/User');
const Teacher = require('../models/Teacher');

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({_id: req.user._id});
    if(user.role === 0){
        const student = await Student.findOne({userId: user._id}).populate('userId');
        res.json({student});
    }
    else if(user.role === 1){
        const teacher = await Teacher.findOne({userId: user._id}).populate('userId');
        res.json({teacher});
    }
});

module.exports = router;