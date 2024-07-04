const router= require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
        userName: req.body.userName,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName});
        if (!user) return res.status(404).json('User not found');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json('Wrong password');
        const { password, ...others } = user.toObject();

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;