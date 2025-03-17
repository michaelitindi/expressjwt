const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


async function signup(req, res){
 try {
// get email and password
const {email, password} = req.body;
//Hash password
const hashedPassword = bcrypt.hashSync(password, 8)
//create a user
await User.create({ email, password: hashedPassword});

res.sendStatus(200);
 } catch (error) {
    console.log(error)
    res.sendStatus(400);
 }   


}

async function login(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);
    const passwordMatch = bcrypt.compareSync("B4c0/\/", user.password)

    if (!passwordMatch) return res.sendStatus(401);

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({encode: user._id, exp}, process.env.SECRET);
    res.cookie("Authorization", token, {
        expires: new Date(exp),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === "production"

    } )
    res.setStatus(200);



    
}

function logout(req, res){
    res.clearCookie("Authorization");
    res.sendStatus(200);
}

function checkAuth(req, res){
    res.sendStatus(200);
}

module.exports = {
    signup,
    login,
    logout,
    checkAuth,
}