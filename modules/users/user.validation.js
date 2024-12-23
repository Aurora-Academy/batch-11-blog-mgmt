const userModel = require("./user.model");
const Joi = require("joi");

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

module.exports = { registerValidation };
