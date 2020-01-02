const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        studnumber: Joi.number()
            .required()
            .min(10000000)
            .max(99999999),
        password: Joi.string()
            .min(6)
            .required(),
        confirmPassword: Joi.string()
            .required()
            .valid(Joi.ref('password')),
        role: Joi.number()
            .required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;