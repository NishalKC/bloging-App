const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username?.trim()) {
    return res.status(400).json({
      message: "Username is required",
    });
  }

  if (!email?.trim()) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Please enter a valid email",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim()) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  next();
};
const validateBlog = (req, res, next) => {
  const { title, content, category } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (title.trim().length < 5) {
    return res.status(400).json({
      message: "Title must be at least 5 characters",
    });
  }

  if (!content?.trim()) {
    return res.status(400).json({
      message: "Content is required",
    });
  }

  if (content.trim().length < 20) {
    return res.status(400).json({
      message: "Content must be at least 20 characters",
    });
  }

  if (!category?.trim()) {
    return res.status(400).json({
      message: "Category is required",
    });
  }

  next();
};
module.exports = {
  validateRegister,
  validateLogin,
  validateBlog
};