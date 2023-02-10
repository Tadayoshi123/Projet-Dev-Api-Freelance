function verifyAdmin(req, res, next) {
    console.log(req.userToken);
    if (!req.userToken.Admin) {
      return res.status('401').send({
        auth: false,
        message: "You don't have the right to access this resource",
      });
    }
    next();
  }
  
  module.exports = verifyAdmin;