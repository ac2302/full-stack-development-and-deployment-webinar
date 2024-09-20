const authOnlyMiddleware = (req, res, next) => {
  if (!req.user.isAuthenticated) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = authOnlyMiddleware;