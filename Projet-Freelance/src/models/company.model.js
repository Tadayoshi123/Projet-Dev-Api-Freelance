const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  RaisonSociale: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 2,
  },
  // StatutSociete qui est soit SAS, SASU, SARL ou EURL (enum)
  StatutSociete: {
    type: String,
    required: true,
    enum: ["SAS", "SASU", "SARL", "EURL"], // permet de définir les valeurs possibles pour le champ
    maxLength: 4,
    minLength: 3,
  },
  // Adresse relation avec le schéma userSchema (user.model.js)
  NumeroSiret: {
    type: String,
    required: true,
    maxLength: 9,
    minLength: 9,
  },
  SiegeSocial: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 2,
  },
  // relation avec le schéma userSchema (user.model.js)
  Utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Company", companySchema);