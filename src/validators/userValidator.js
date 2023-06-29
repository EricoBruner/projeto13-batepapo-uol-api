import joi from "joi";

export default function userValidator(user) {
  const userSchema = joi.object({
    name: joi.string().required(),
  });

  const validation = userSchema.validate(user);

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
