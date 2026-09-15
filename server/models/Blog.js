const mongoose =require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    content: {
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true,
        trim: true
    },
    coverImage:{
        type: String,
        defult: ""
    },
    tags: {
        type: [String],
        defult: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
},
{
    timestamps: true,
}
)
module.exports = mongoose.model("Blog", blogSchema)