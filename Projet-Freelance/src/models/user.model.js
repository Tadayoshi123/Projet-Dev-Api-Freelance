const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  Nom: {
    type: String,
    required: true,
    uppercase: true,
    maxLength: 50,
    minLength: 2,
  },
  Prenom: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2,
  },
  Adresse: {
    type: String,
    required: true,
    maxLength: 500,
    minLength: 2,
  },
  Ville: {
    type: String,
    required: true,
    maxLength: 200,
    minLength: 2,
  },
  CodePostal: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 2,
  },
  Telephone: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 2,
    unique: true,
  },
  Mail: {
    type: String,
    required: true,
    unique: true,
  },
  MotDePasse: {
    type: String,
    required: true,
  },
  Admin: {
    type: Boolean,
    default: false,
  },
  TypeUser : {
    type: String,
    enum: ["Freelance", "Company"],
  },
  Freelance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelance",
  },
  Company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("MotDePasse")) {
    return next();
  }

  bcrypt.hash(this.MotDePasse, 10, (err, MotDePasseHash) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.MotDePasse = MotDePasseHash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
