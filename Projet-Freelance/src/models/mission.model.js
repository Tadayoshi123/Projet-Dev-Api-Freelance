const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
    DateDebut :{
        type: Date,
        required: true,
    },
    DateFin :{
        type: Date,
        required: true,
    },
    MontantTotal :{
        type: Number,
        required: true,
    },
    Description :{
        type: String,
        required: true,
        maxLength: 500,
        minLength: 2,
    },
    Titre :{
        type: String,
        required: true,
        maxLength: 200,
        minLength: 2,
    },
    Metier :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    Competence :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    },
    Statut :{
        type: String,
        required: true,
        enum : ['En cours', 'Clôturé'],
        default: 'En cours'
    },
});

module.exports = mongoose.model('Mission', missionSchema);