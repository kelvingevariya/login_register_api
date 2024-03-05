const Joi = require('joi');


export async function validator(req, res, next) {
    const { error, data } = await registerSchema.validate(req.body, { abortEarly: false })
    if (error) {
        res.status(400).json(error.message.replace(/\"+/g, ""))
    } else {
        next();
    }

}

const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().required()
        .email({ minDomainSegments: 2 }),
    userPass: Joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string()
})

