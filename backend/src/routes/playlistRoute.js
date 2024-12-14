const express = require("express");

const { protect } = require("../middlewares/authMiddleware");
const {
  handleCreatePlaylist,
  handleGetPlaylists,
  handleDeletePlaylist,
  handleUpdatePlaylist,
  handleGetPlaylist,
  handleAddTrackToPlaylist,
} = require("../controllers/playlistController");

const router = express.Router();

router.post("/", protect, handleCreatePlaylist);

router.put("/:id/song", protect, handleAddTrackToPlaylist);

router.put("/:id", protect, handleUpdatePlaylist);

router.delete("/:id", protect, handleDeletePlaylist);

router.get("/:id", protect, handleGetPlaylist);

router.get("/", protect, handleGetPlaylists);
module.exports = router;
