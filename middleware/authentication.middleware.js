const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.headers.cookie;

  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      req.body.user = decoded.user;
      next();
    } else {
      res.send({ msg: "Please login first" });
    }
  } else {
    res.send({ msg: "Please login first" });
  }
}

module.exports = { authentication };
