const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.getAllUsersAdmin = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.updateUserAdmin = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found",
        });
      }
      User.findById(user._id).then((userupdated) => {
        res.send(userupdated);
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.deleteUserAdmin = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found",
        });
      }
      res.send(user);
    })
    .catch((error) => res.status(400).send(error));
};

exports.getUserAdmin = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found",
        });
      }
      res.send(user);
    })
    .catch((error) => res.status(400).send(error));
};

exports.updateUserProfile = async (req, res) => {
  User.findByIdAndUpdate(req.params.userToken.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User Not found",
      });
    }
    User.findById(user._id).then((userupdated) => {
      res.send(userupdated);
    });
  });
};

exports.forgotPassword = async (req, res) => {
  User.findOne({ Mail: req.body.Mail }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Mail " + req.body.Mail + " Not found",
      });
    }
    const hashedPassword = bcrypt.hashSync(req.body.MotDePasse, 10);
    user.MotDePasse = hashedPassword;
    User.updateOne(
      { MotDePasse: user.MotDePasse },
      { MotDePasse: req.body.MotDePasse }
    )
      .then((userupdated) => {
        res.status(201).send({
          user: userupdated,
          message:
            user.Nom +
            user.Prenom +
            "Your password has successfully been updated !",
        });
      })
      .catch((error) => res.status(400).send(error));
  });
};
