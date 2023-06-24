const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require("../middleware/authenticate")

require('../db/conn');
const User = require('../model/userSchema');
router.get('/', (req, res) => {
    res.send("ho home ");
    res.status(200).json({ msg: "plz fil the field" });
})

//promise method
// router.post('/register', (req, res) => {
//     console.log(req.body);

//     const { name, email, phone, work, password, cpassword } = req.body;
//     if (!name||!email||!phone||!work||!password||!cpassword) {
//         return res.status(422).json({ error: "plz fil the field" })
//     }
//     User.findOne({email:email}).then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "email alredy entered" });
//         }                                                                                                                
//         const user= new User({name, email, phone, work, password, cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered"});
//         }).catch((err)=>res.json({error:"failled"}));
//         })
//     console.log(req.body);
// })

// async await

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fil the field" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email alredy entered" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password not matched" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            const userRegister = await user.save();
            if (userRegister) {
                res.status(201).json({ message: "user registered" });
            }
            else {
                res.json({ error: "failled" });
            }
        }
    } catch (error) {
        console.log(error);
    }

})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ 'err': 'plz fill details' });
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            console.log("this is pass 1", userLogin.password);
            console.log("this is password 2", password);

            let token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25992000000),
                httpOnly: true
            });
            // console.log(userLogin);
            if (!isMatch) {
                res.status(400).json({ error: "error math" });
            }
            else {
                res.json({ message: "user sign in" });
            }
        } else {
            res.status(400).json({ error: "errorno" });

        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/about', authenticate, (req, res) => {
    console.log("HELLO FROM ATUH PAGE");
    res.send(req.rootUser);
})

router.get('/getdata', authenticate, (req, res) => {
    console.log("HELLO FROM ATUH PAGE");
    res.send(req.rootUser);
})

router.post('/contact', authenticate, async (req, res) => {

    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json({ error: "plz filled details" });
        }
        const userContact =await User.findOne({ _id: req.userID });

        if (userContact) {
        const userMessage = await userContact.addMessage(name,email,phone,message);
        await userContact.save();
        res.status(201).json({message:'userContact Suceessfully'});
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', (req, res) => {
    console.log("HELLO FROM ATUH PAGE");
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send("user logout");
})

module.exports = router;