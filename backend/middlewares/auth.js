const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  try {
    if (!authorizationHeader) {
      req.user = { isAuthenticated: false };
      return next();
    }

    const accessToken = authorizationHeader.split(" ").at(-1);

    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        req.user = { isAuthenticated: false };
        return next();
      }

      if (!decoded) {
        req.user = { isAuthenticated: false };
        return next();
      }

      req.user = {
        isAuthenticated: true,
        ...decoded,
      };

      next();
    });
  } catch (err) {
    req.user = { isAuthenticated: false };
    next();
  }
};

module.exports = authMiddleware;
