const { z } = require("zod");

const songSchema = z.object({
  title: z.string().min(1, "Song title is required"),
  duration: z.number().min(1, "Song duration is required"),
  songId: z.string().min(1, "Song ID is required"),
});

const playlistSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
  songs: songSchema.array().optional(),
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid user ID format",
  }),
});

module.exports = { playlistSchema, songSchema };
