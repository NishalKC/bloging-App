const express = require("express")
const Routes = express.Router()
const islogined = require('../middleware/islogined')
const { createBlog, get_all_blogs, getblogbyId, Updateblog, Deleteblog, getmyblogs } = require("../controllers/blogcontroller")
const upload = require("../config/Multer")
const { validateBlog } = require("../middleware/validateMiddleware")

Routes.get("/", get_all_blogs)
Routes.post("/create", islogined, upload.single("coverImage"),validateBlog,createBlog)
Routes.get("/myblogs", islogined, getmyblogs)
Routes.get("/:id", islogined, getblogbyId)
Routes.put("/update/:id", islogined, upload.single("coverImage"),validateBlog,Updateblog)
Routes.delete("/delete/:id", islogined, Deleteblog)


module.exports = Routes