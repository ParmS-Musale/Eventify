const isAdmin = (req, res, next) => {
  const user = req.user;
  try {
    const admin = req.user.role === "Admin";
    if (!admin) {
      throw new Error("You Are Not Authorized Person..!!");
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = isAdmin;
