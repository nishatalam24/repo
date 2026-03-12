exports.checkAdmin = (req, res, next) => {
  const role = req.headers.role;

  if (role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};