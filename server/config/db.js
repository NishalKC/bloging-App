const mongoose = require("mongoose")

const connectDB =async  () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoDB conected successfully")
    } catch (err) {
        console.error("mongoDB connection failed")
        console.error(err.message)

        process.exit(1)
    }
}

module.exports = connectDB
