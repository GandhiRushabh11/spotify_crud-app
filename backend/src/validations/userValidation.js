const { z } = require("zod");

const userValidationSchema = z.object({
  username: z.string().trim().min(1, "Username is required").toLowerCase(),
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
});

module.exports = { userValidationSchema };
