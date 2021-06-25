import Joi from "joi"

const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(25)
        .required(),
    email: Joi.string()
        .email({})
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    confirmPassword: Joi.ref('password')
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email({})
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .required() 
})

const operationSchema  = Joi.object({
    ammount: Joi.number()
        .min(1)
        .required(),
    description: Joi.string()
        .min(1)
        .required(),
    operation: Joi.string()
        .valid('cashin', 'cashout')
})

export {registerSchema,loginSchema, operationSchema};