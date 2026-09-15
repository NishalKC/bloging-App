const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Image size must be less than 5MB",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      message: err.message,
    });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;