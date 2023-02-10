const mongoose = require("mongoose");

const freelanceSchema = mongoose.Schema({
  Honoraire: {
    type: Number,
    required: true,
    maxLength: 50,
    minLength: 2,
  },
  Experience: {
    type: String,
    required: true,
    maxLength: 2000,
    minLength: 2,
  },
  // Competences relation avec le schéma skillSchema (competence.model.js)
  Competences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
  },
  // Metier relation avec le schéma jobSchema (metier.model.js)
  Metiers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  // relation avec le schéma userSchema (user.model.js)
    Utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Freelance", freelanceSchema);
