const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.registerUser= async (req, res ) => {
    try {
        let{username, email,password }= req.body
        if (!username || !email || !password) return res.status(404).json({message: "All feilds are reguired"})
        
        const existingUser = await userModel.findOne({email: email})
        if(existingUser)return  res.status(409).json({
            message: "User already Exists"
        })

        const Hashedpassword = await  bcrypt.hash(password, 10)
        const user = await userModel.create({
            name: username,
            email: email,
            password: Hashedpassword
        })
        let token = jwt.sign({email: user.email ,userID: user._id }, process.env.JWT_SECRET)
            res.cookie("Token", token, {
                httpOnly: true,
                secure: false
            })
         res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });


    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}

module.exports.loginUser = async(req, res) => {
try {
    let {email, password} = req.body

    if(!email || !password) return res.status(400).json({
        message: "email and Password are required"
    })

    let user = await userModel.findOne({email: email})

    if(!user) return res.status(401).json({
        message: "Uvalid email or password"
    })

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.json({message: err.message})
        if (result){
            let token = jwt.sign({email: user.email,userID: user._id }, process.env.JWT_SECRET)
            res.cookie("Token", token, {
                httpOnly: true,
                secure: false
            })
            return res.status(200).json({
                message: "login successfully",
                user: user
            })
        }else{
            return res.status(401).json({
                message:"Unvalid email or password"
            })
        }

    }
    )
} catch (error) {
    res.status(500).json({
        message: error.message
    })
}



}

module.exports.logout = (req, res) => {
    res.cookie("Token", "")
    return res.status(200).json({
        message: "Logout successfully"
    })
}
 
module.exports.getme= async (req, res) => {
    try {
        let user = await  userModel.findOne({email: req.user.email})
        if(!user) return res.json({
            message: "User not found"
        })
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



