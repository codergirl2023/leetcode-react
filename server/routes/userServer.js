const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {searchRecord,createRecord,connectToDB} = require('../../dbms/db');
const Users = require('../../dbms/schema/UserSchema');
const auth = require('../../middleware/auth');

connectToDB("users");

router.post('/signup', async (req, res) => {

    try {
        const {email,password} = req.body;
        const user = await searchRecord(Users,{email});
        if (user.length) {
            return res.status(403).send({'msg':'Username already exists in our database, please try some other username'});
        }

        const token = jwt.sign(
            { email, password },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
        );
        createRecord(Users,{email, password});
        res.status(200).send({ 'message': 'User created successfully', 'jwtToken': token });
    } catch (error) {
        console.error('Error creating the user:', error);
        return res.status(500).send('Error creating the user. Please try again later.');
    }
});

router.post('/login', async (req, res)=>{
    const {email,password} = req.headers;
    const user = await searchRecord(Users,{email,password});
    if(!user.length){
        return res.status(403).send({'msg':'email or password is incorrect. Please try with correct email/password'});
    }
    const token = jwt.sign(
        { email, password },
        process.env.TOKEN_KEY,
        {
            expiresIn: "1h",
        }
    );

    return res.status(200).send({'message':'User logged in successfully', 'jwtToken':token});
});

router.get('/all',auth,async (req,res)=>{
    const allUsers = await searchRecord(Users,{});

    res.status(200).send(allUsers);
});

router.get('/me',auth,(req,res)=>{
    return res.status(200).send({email:req.user.email});
});

module.exports = router;
