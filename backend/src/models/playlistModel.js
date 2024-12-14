const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Song title is required"],
    trim: true,
  },
  duration: {
    type: String,
    required: [true, "Song duration is required"],
  },
  songId: {
    type: String,
    required: [true, "Song ID is required"],
  },
});

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Playlist title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    songs: {
      type: [songSchema],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A playlist must belong to a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
