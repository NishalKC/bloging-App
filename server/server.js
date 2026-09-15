const app = require('./app')
require("dotenv").config()

const connectDB = require("./config/db")
connectDB()

const Port = process.env.PORT

app.listen(Port, () => {
    console.log("server is running at port 5000")
}
)