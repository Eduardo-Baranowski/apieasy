const mongoose = require('mongoose');
var uuid = require('node-uuid');

const User = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuid.v4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefone: {
        type: String,
        required: true
    },    
    linkedin: {
        type: String,
        required: false
    },    
    cidade: {
        type: String,
        required: true
    },  
    portfolio: {
        type: String,
        required: false
    }, 
    disponibilidade: {
        type: String,
        required: false
    },   
    horario: {
        type: String,        
        required: false
    },                     
    salario: {
        type: Number,
        required: true
    }, 
    ionic: {
        type: Number,        
        required: true
    }                                                             
},
{
    timestamps: true,
});


module.exports = mongoose.model('user', User);
