const userModel = require("./user.model");
const Joi = require("joi");

const forgetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "io"] },
    })
    .required(),
});

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/[\w\s]/)
    .min(3)
    .max(50)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "io"] },
    })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .error(new Error("Password failed to meet the condition")),
  image: Joi.string().optional(),
});

const verifyFPSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "io"] },
    })
    .required(),
  token: Joi.number()
    .less(999999)
    .greater(100000)
    .required()
    .error(new Error("Token failed to meet the condition")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .error(new Error("Password failed to meet the condition")),
});

const FPValidation = async (req, res, next) => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) {
    const { details = [] } = error;
    const [a = {}] = details;
    const { message = null } = a;
    const err = message || error;
    next(err);
  }
  next();
};

const registerValidation = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const { details = [] } = error;
    const [a = {}] = details;
    const { message = null } = a;
    const err = message || error;
    next(err);
  }
  const userExists = await userModel
    .findOne({ email: req.body.email })
    .select("-password -roles");
  if (userExists) {
    next(new Error("User already exists"));
  }
  next();
};

const verifyFPValidation = async (req, res, next) => {
  const { error } = verifyFPSchema.validate(req.body);
  if (error) {
    const { details = [] } = error;
    const [a = {}] = details;
    const { message = null } = a;
    const err = message || error;
    next(err);
  }
  next();
};

module.exports = { FPValidation, registerValidation, verifyFPValidation };
