const Skill = require("../models/competence.model.js");

exports.createSkill = (req, res) => {
  const newSkill = new Skill({
    Nom: req.body.Nom,
  });
  newSkill
    .save()
    .then((skill) => {
      res.send(skill);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getAllSkills = (req, res) => {
  Skill.find()
    .then((skills) => {
      res.send(skills);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getSkill = (req, res) => {
  Skill.findById(req.params.id)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.id,
        });
      }
      res.send(skill);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving skill with id " + req.params.id,
      });
    });
};

exports.updateSkill = (req, res) => {
  Skill.findByIdAndUpdate(req.params.id, req.body)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill Not found",
        });
      }
      Skill.findById(skill._id).then((skillupdated) => {
        res.send(skillupdated);
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.deleteSkill = (req, res) => {
  Skill.findByIdAndDelete(req.params.id)
    .then((skill) => {
      if (!skill) {
        return res.status(404).send({
          message: "Skill not found with id " + req.params.id,
        });
      }
      res.send(skill);
    })
    .catch((error) => res.status(400).send(error));
};
