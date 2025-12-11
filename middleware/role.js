exports.isHR = (req, res, next) => {
  if (!req.user || req.user.role !== "hr") {
    return res.status(403).json({
      message: "Akses ditolak, hanya HR",
    });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({
      message: "Akses ditolak, hanya User",
    });
  }
  next();
};
