const Job = require("../models/metier.model.js");

exports.createJob = (req, res) => {
  const newJob = new Job({
    Nom: req.body.Nom,
  });
  newJob
    .save()
    .then((job) => {
      res.send(job);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getAllJobs = (req, res) => {
  Job.find()
    .then((jobs) => {
      res.send(jobs);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.getJob = (req, res) => {
  Job.findById(req.params.id)
    .then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "Job not found with id " + req.params.id,
        });
      }
      res.send(job);
    })
    .catch((error) => {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Job not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving job with id " + req.params.id,
      });
    });
};

exports.updateJob = (req, res) => {
  Job.findByIdAndUpdate(req.params.id, req.body)
    .then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "Job Not found",
        });
      }
      Job.findById(job._id).then((jobupdated) => {
        res.send(jobupdated);
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.deleteJob = (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then((job) => {
      if (!job) {
        return res.status(404).send({
          message: "Job not found with id " + req.params.id,
        });
      }
      res.send(job);
    })
    .catch((error) => res.status(400).send(error));
};
