import joi from "joi";

export default function messageValidator(message) {
  const messageSchema = joi.object({
    to: joi.string().required(),
    text: joi.string().required(),
    type: joi.string().valid("message", "private_message").required(),
    from: joi.string().required(),
  });

  const validation = messageSchema.validate(message, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return errors;
  } else {
    return null;
  }
}
