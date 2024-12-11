const {
  playlistSchema: zodPlaylistSchema,
  playlistSchema,
} = require("../validations/playlistValidation");
const Playlist = require("../models/playlistModel");

//Create Playlist
exports.handleCreatePlaylist = async (req, res, next) => {
  try {
    const userID = req.user.id;
    const validatedData = zodPlaylistSchema.parse({
      user: userID,
      ...req.body,
    });

    const newPlaylist = await Playlist.create(validatedData);

    res.status(201).json({
      success: true,
      data: newPlaylist,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return next(error);
    }
    next(error);
  }
};

//Get My All Playlists
exports.handleGetPlaylists = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const playlist = await Playlist.find({
      user: userID,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

//Get My one Playlist
exports.handleGetPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userID = req.user.id;

    const playlist = await Playlist.findOne({
      _id: id,
      user: userID,
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Playlist
exports.handleDeletePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userID = req.user.id;

    const deletedPlaylist = await Playlist.findOneAndDelete({
      _id: id,
      user: userID,
    });

    if (!deletedPlaylist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      data: deletedPlaylist,
    });
  } catch (error) {
    next(error);
  }
};

// Updating Plaulist

exports.handleUpdatePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userID = req.user.id;

    // Validate the request body
    const validatedData = playlistSchema.partial().parse({
      user: userID,
      ...req.body,
    });

    const updatedPlaylist = await Playlist.findOneAndUpdate(
      { _id: id, user: userID },
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedPlaylist,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return next(error);
    }
    next(error);
  }
};
