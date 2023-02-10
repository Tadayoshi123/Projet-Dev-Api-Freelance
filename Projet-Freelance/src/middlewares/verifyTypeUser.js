exports.verifyTypeUserCompany = (req, res, next) => {
  console.log(req.userToken);
  if (!req.userToken.TypeUser === "Company") {
    return res.status("401").send({
      auth: false,
      message: "You don't have the right to access this resource",
    });
  }
  next();
}

exports.verifyTypeUserFreelance = (req, res, next) => {
  console.log(req.userToken);
  if (!req.userToken.TypeUser === "Freelance") {
    return res.status("401").send({
      auth: false,
      message: "You don't have the right to access this resource",
    });
  }
  next();
}
