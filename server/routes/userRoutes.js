const express = require("express")
const Router = express.Router()
const islogined = require("../middleware/islogined")
const {registerUser, loginUser, logout, getme} = require("../controllers/usercontroller")
const { validateRegister, validateLogin } = require("../middleware/validateMiddleware")

Router.post("/register", validateRegister,registerUser)
Router.post("/login",validateLogin, loginUser)
Router.post("/logout", logout)
Router.get("/me",islogined,getme)


module.exports = Router

