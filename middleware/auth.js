const jwt = require("jsonwebtoken");
const env = require('dotenv');
env.config({path:'../.env'});
const {TOKEN_KEY} = process.env;

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = jwt.verify(token, TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = auth;