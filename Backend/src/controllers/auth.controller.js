const userModel = require("../models/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model.js")


/**
* @function registerUserController
* @desc Register a new user
* @access Public
 */
async function registerUserController(req, res){
    try{
        const { username, email, password } = req.body

        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        //check if user already exists
        const existingUser = await userModel.findOne({ $or: [{username}, {email}] })
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
        //create new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword, 
        })
        //generate JWT token
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: "1d" })

        //set token in cookie
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});

        //respond with success message and token
        res.status(201).json({message:"User created successfully", user: { id: newUser._id, username: newUser.username, email: newUser.email }, token })

    }catch(err){
        res.status(500).json({message:"Server Error", error:err.message})
    }

}

/**
 * @function loginUserController
 * @desc Login a user
 * @access Public
 */
async function loginUserController(req, res){
    try{
        const { email, password } = req.body;
    //validate input
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    //check if user exists
    const user = await userModel.findOne({ email })
    if (!user) {
    return res.status(400).json({
        message: "Invalid credentials"
    });
}
     //validate password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"})
    }
    //generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })
    //set token in cookie
    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});
    //respond with success message and token
    res.status(200).json({ message: "User loggedIn successfully.", user: { id:user._id, username: user.username, email: user.email }, token })

    }catch(err){
        res.status(500).json({message:"Server Error", error:err.message})
    }
   
}

/**
 * @function logoutUserController
 * @desc Logout a user / add token to blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(400).json({
                message: "No token found to logout"
            })
        }

        // Add token to blacklist
        await tokenBlacklistModel.create({ token })

        res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});

        return res.status(200).json({
            message: "User logged out successfully."
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
}

/**
 * @function getMeController
 * @desc Get current logged-in user's information
 * @access Private
 */
async function getMeController(req, res){
    const user = await userModel.findById(req.user.id)

    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"User details fetched successfully", user:{id:user._id, username:user.username, email:user.email}})

}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
