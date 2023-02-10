const User = require("../models/user.model");
const Freelance = require("../models/freelance.model");
const Company = require("../models/company.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../service/mail");

exports.registerCompany = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.MotDePasse, 10);
  const newUser = new User({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Adresse: req.body.Adresse,
    Ville: req.body.Ville,
    CodePostal: req.body.CodePostal,
    Telephone: req.body.Telephone,
    Mail: req.body.Mail,
    MotDePasse: hashedPassword,
    Admin: false,
    TypeUser: req.body.TypeUser,
    Freelance: null,
    Company: null,
  });
  const newCompany = new Company({
    RaisonSociale: req.body.RaisonSociale,
    StatutSociete: req.body.StatutSociete,
    NumeroSiret: req.body.NumeroSiret,
    SiegeSocial: req.body.SiegeSocial,
    Utilisateur: createdUser._id,
  });
  try {
    await newCompany.save();
    newUser.Company = newCompany._id;
    await newUser.save();

    const userToken = jwt.sign(
      {
        id: newUser._id,
        Admin: newUser.Admin,
        TypeUser: newUser.TypeUser,
      },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      auth: true,
      user: newUser,
      company: newCompany,
      token: userToken,
      message:
        newUser.Nom +
        " " +
        newUser.Prenom +
        " a bien été enregistré en tant qu'employé dans l'entreprise " +
        newCompany.RaisonSociale +
        " !",
    });
    sendMail(newUser);
  } catch (error) {
    res.status(500).send({
      auth: false,
      token: null,
      message:
        error.message ||
        "Une erreur est survenue lors de la création de l'utilisateur.",
    });
  }
};

exports.registerFreelance = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.MotDePasse, 10);
  const newUser = new User({
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Adresse: req.body.Adresse,
    Ville: req.body.Ville,
    CodePostal: req.body.CodePostal,
    Telephone: req.body.Telephone,
    Mail: req.body.Mail,
    MotDePasse: hashedPassword,
    Admin: false,
    TypeUser: req.body.TypeUser,
    Freelance: null,
    Company: null,
  });
  const newFreelance = new Freelance({
    Honoraire: req.body.Honoraire,
    Experience: req.body.Experience,
    Competences: null,
    Metiers: null,
  });
  try {
    await newFreelance.save();
    newUser.Freelance = newFreelance._id;
    await newUser.save();

    const userToken = jwt.sign(
      {
        id: newUser._id,
        Admin: newUser.Admin,
        TypeUser: newUser.TypeUser,
      },
      process.env.JWT_SECRET
    );
    res.status(201).json({
      auth: true,
      user: newUser,
      freelance: newFreelance,
      token: userToken,
      message:
        newUser.Nom +
        " " +
        newUser.Prenom +
        " a bien été enregistré en tant que freelance !",
    });
    sendMail(newUser);
  } catch (error) {
    res.status(500).send({
      auth: false,
      token: null,
      message:
        error.message ||
        "Une erreur est survenue lors de la création de l'utilisateur.",
    });
  }
};

exports.login = (req, res) => {
  User.findOne({ Mail: req.body.Mail }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé !" });
    }
    let passwordValid = bcrypt.compare(req.body.MotDePasse, user.MotDePasse);
    if (!passwordValid) {
      return res.status(404).json({
        auth: false,
        error: "Mot de passe incorrect !",
      });
    }
    const userToken = jwt.sign(
      {
        id: user._id,
        Admin: user.Admin,
        TypeUser: user.TypeUser,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      user: user,
      token: userToken,
    });
  });
};
