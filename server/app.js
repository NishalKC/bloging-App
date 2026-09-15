const express = require("express")
const app = express()
const userRoute = require("./routes/userRoutes")
const blogRoute = require("./routes/blogRoutes")
const cookieParser = require("cookie-parser")
const path = require("path")
const cors= require("cors")
const errorMiddleware = require("./middleware/errorMiddleware")

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bloging-app-amber.vercel.app"
    ],
    credentials: true,
  })
);
app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Blogify API is running",
  });
});

app.use(errorMiddleware)

module.exports = app