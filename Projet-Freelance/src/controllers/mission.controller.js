const Mission = require("../models/mission.model.js");

exports.createMission = (req, res) => {
  const newMission = new Mission({
    DateDebut: req.body.DateDebut,
    DateFin: req.body.DateFin,
    MontantTotal: req.body.MontantTotal,
    Description: req.body.Description,
    Titre: req.body.Titre,
    Metier: req.body.Metier,
    Competence: req.body.Competence,
    Statut: req.body.Statut,
  });
  newMission
    .save()
    .then((mission) => {
      res.send(mission);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.updateMission = (req, res) => {
  Mission.findByIdAndUpdate(req.params.id, req.body)
    .then((mission) => {
      if (!mission) {
        return res.status(404).send({
          message: "Mission Not found",
        });
      }
      Mission.findById(mission._id).then((missionupdated) => {
        res.send(missionupdated);
      });
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Mission not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating mission with id " + req.params.id,
      });
    });
};

exports.deleteMission = (req, res) => {
  Mission.findByIdAndDelete(req.params.id)
    .then((mission) => {
      if (!mission) {
        return res.status(404).send({
          message: "Mission not found with id " + req.params.id,
        });
      }
      res.send({ message: "Mission deleted successfully!" });
    })
    .catch((error) => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          message: "Mission not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete mission with id " + req.params.id,
      });
    });
};

exports.getAllMissions = (req, res) => {
  Mission.find()
    .then((missions) => {
      res.send(missions);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getMission = (req, res) => {
  Mission.findById(req.params.id)
    .then((mission) => {
      if (!mission) {
        return res.status(404).send({
          message: "Mission not found with id " + req.params.id,
        });
      }
      res.send(mission);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Mission not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving mission with id " + req.params.id,
      });
    });
};
