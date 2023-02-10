const {body, validationResult} = require('express-validator');

exports.checkAuth = [
    body('Mail').isEmail().withMessage('Mail invalide'),
    body('MotDePasse').isLength({min: 11}).isStrongPassword({
        minLength: 11,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Mot de passe invalide')
];

exports.checkRegister = [
    body('Nom').isLength({min: 2, max: 50}).withMessage('Nom invalide'),
    body('Prenom').isLength({min: 2, max: 50}).withMessage('Prénom invalide'),
    body('Adresse').isLength({min: 2, max: 500}).withMessage('Adresse invalide'),
    body('Ville').isLength({min: 2, max: 200}).withMessage('Ville invalide'),
    body('CodePostal').isLength({min: 2, max: 20}).withMessage('Code postal invalide'),
    body('Telephone').isLength({min: 2, max: 20}).withMessage('Téléphone invalide'),
    body('Mail').isEmail().withMessage('Mail invalide'),
    body('MotDePasse').isLength({min: 11}).isStrongPassword({
        minLength: 11,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Mot de passe invalide')
];

exports.checkSkill = [
    body('Nom').isLength({min: 2, max: 200}).withMessage('Nom invalide')
];

exports.checkJob = [
    body('Nom').isLength({min: 2, max: 200}).withMessage('Nom invalide')
];

exports.checkMission = [
    body('Titre').isLength({min: 2, max: 200}).withMessage('Titre invalide'),
    body('Description').isLength({min: 2, max: 5000}).withMessage('Description invalide'),
    body('DateDebut').isDate().withMessage('Date de début invalide'),
    body('DateFin').isDate().withMessage('Date de fin invalide'),
    body('MontantTotal').isNumeric().withMessage('Montant total invalide'),
    this.checkSkill,
    this.checkJob,
    body('Statut').isIn(['En cours', 'Clôturé']).withMessage('Statut invalide')
];

exports.checkFreelance = [
    body('Honoraire').isNumeric().withMessage('Honoraire invalide'),
    body('Experience').isNumeric().withMessage('Expérience invalide')
];


exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}