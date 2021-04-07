
const Joi = require('joi');


const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        telefone: Joi.string()
            .min(6)
            .required(),
        linkedin: Joi.string()
            .min(6),
        cidade: Joi.string()
            .min(6)
            .required(),
        portfolio: Joi.string()
            .min(6),
        disponibilidade: Joi.string()
            .min(3),
        horario: Joi.string()
            .min(5),
        salario: Joi.number()
            .required(),
        ionic: Joi.number()
            .required(),

    });
    const validation = schema.validate(data);
    return validation;
};

module.exports.registerValidation = registerValidation;