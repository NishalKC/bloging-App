const { default: mongoose } = require("mongoose");
const blogModel = require("../models/Blog")
const userModel = require("../models/userModel")

module.exports.createBlog = async (req, res) => {
    try {

        const { title, content, category, tags } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }
        let user = await userModel.findOne({email: req.user.email})

        let imagePath = `uploads/${req.file.filename}`
        
        const blog = await blogModel.create({
            title,
            content,
            category,
           tags: tags
                ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                : [],
            author: req.user.userID,
            coverImage: imagePath
        });
        user.Blogs.push(blog._id)
        await user.save()
        
        return res.status(201).json({
            message: "Blog created successfully",
            blog, user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};


module.exports.get_all_blogs= async(req, res) => {
    try {
        Blogs = await blogModel.find().populate("author")

        return res.status(200).json(Blogs)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getblogbyId= async(req,  res) => {
    try {
        const {id}= req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "Unvalid blog ID"
            })
        }
        let blog = await blogModel.findOne({_id:id}).populate("author")

        if(!blog) return res.status(404).json({
            message: "Blog not found"
        })

        return res.status(200).json(blog)

    } catch (error) {

        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.Updateblog = async(req, res ) => {
    try {
        let {id}=  req.params
        let{title, content, category, tags}= req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "Unvalid blog Id"
            })
        }

        let blog = await blogModel.findOne({_id: id})

        if(!blog)return res.status(404).json({
            message: "Blog not found"
        })
        
        if(blog.author.toString()!= req.user.userID){
            return res.status(403).json({
                message: "You are not allowed to do"
            })
        }
        blog.title= title
        blog.content= content
        blog.category= category
        blog.tags= tags

        if(req.file){
            blog.coverImage= `uploads/${req.file.filename}`
        }
        await blog.save()

        return res.status(200).json({
            message: "blog updated successfully",
            blog
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports.Deleteblog= async (req, res) => {
    try{
        let{id}= req.params
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
            message: "Unvalid blog id"
        })

        let blog= await blogModel.findOne({_id : id})
        let user = await userModel.findOne({email: req.user.email})

        if(!blog) return res.status(404).json({
            message: "Blog not found"
        })

        if(blog.author.toString()!== req.user.userID){
            return res.status(403).json({
                message: "You are not allowed to delete this blog"
            })
        }
        await blogModel.findOneAndDelete({_id : id})
        user.Blogs.splice(user.Blogs.indexOf(id))
        await user.save()

        return res.status(200).json({
            message:"Blog delete successfully",
        })

    }catch(error){
        return res.status(500).json({
            message : error.message
        })
    }
}

module.exports.getmyblogs =async (req, res ) => {
    try{
        let blogs = await blogModel.find({author: req.user.userID}).populate("author")

        return res.status(200).json(blogs)

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}


