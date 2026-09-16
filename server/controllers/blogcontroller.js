const { default: mongoose } = require("mongoose");
const blogModel = require("../models/Blog")
const userModel = require("../models/userModel")
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

module.exports.createBlog = async (req, res) => {
    try {

        const { title, content, category, tags } = req.body;

        if (!title || !content || !category) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }
        let user = await userModel.findOne({email: req.user.email})

        let imageUrl = "";
        let imageID = "";

        if (req.file) {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "blogify",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
          });
      
          imageUrl = result.secure_url;
          imageID = result.public_id
        }
        
        const blog = await blogModel.create({
            title,
            content,
            category,
           tags: tags
                ? tags.split(",").map((tag) => tag.trim()).filter(Boolean)
                : [],
            author: req.user.userID,
            coverImage: imagePath,
            coverImageId: imageID
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

module.exports.Updateblog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid blog ID",
      });
    }

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    // Only the author can update
    if (blog.author.toString() !== req.user.userID) {
      return res.status(403).json({
        message: "You are not allowed to update this blog",
      });
    }

    // Update text fields
    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.tags = tags ? tags.split(",") : [];

    // Update cover image if a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.coverImageId) {
        await cloudinary.uploader.destroy(blog.coverImageId);
      }

      // Upload new image
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "blogify" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      blog.coverImage = result.secure_url;
      blog.coverImageId = result.public_id;
    }

    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

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


