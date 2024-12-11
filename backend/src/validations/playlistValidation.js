const { z } = require("zod");

const playlistSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
  songs: z.object({
    title: z.string().min(1, "Song title is required"),
  }),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid user ID format",
  }),
});

module.exports = { playlistSchema };
