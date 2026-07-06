const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

async function authUser(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token not found" });
    }
    const blacklistedToken = await tokenBlacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: token is blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request object(in get controller we can access user info from req.user)
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
}

module.exports = { authUser };
