const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    Blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

module.exports = mongoose.model("user", userSchema)
