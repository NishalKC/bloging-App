const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        let token = req.cookies.Token
        if(!token || token== ""){
            return res.status(401).json({
                message: "You must login first"
            })
        }else{
            let user = jwt.verify(token, process.env.JWT_SECRET)
            req.user = user
            next()
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
