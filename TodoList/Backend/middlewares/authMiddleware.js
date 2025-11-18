const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized: No token found");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // store user info in req
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
