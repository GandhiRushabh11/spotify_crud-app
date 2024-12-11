const { z } = require("zod");

const loginValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

module.exports = { loginValidationSchema };
