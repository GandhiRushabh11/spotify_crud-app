import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { searchSpotify } from "../services/spotify";
import { toast } from "react-toastify";
import AddToPlaylist from "../components/AddToPlaylist";

function PlayList() {
  const [query, setQuery] = useState("millionaire");
  const [songs, setSongs] = useState([]);
  const accessToken = localStorage.getItem("spotifyToken");
  const [isOpen, setIsOpen] = useState(false);
  const [trackID, setTrackID] = useState("");

  // Fetch songs from Spotify
  const fetchSongs = async (searchQuery) => {
    if (!searchQuery) return;

    try {
      const response = await searchSpotify(query, accessToken);
      setSongs(response.tracks.items);
    } catch (error) {
      toast.error("Error fetching songs:", error);
    }
  };

  const toggleAddToPlaylist = (track) => {
    setIsOpen(!isOpen);
    setTrackID(track);
  };

  useEffect(() => {
    fetchSongs(query);
  }, [query]);
  return (
    <div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a song"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-full rounded p-3 border border-slate-200 "
        />
      </div>
      {songs.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-8">
          No Results Found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {songs.length > 0 &&
            songs.map((song) => (
              <div
                key={song.id}
                className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
              >
                <img
                  src={song?.album.images[1].url}
                  alt={song.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold truncate">{song.name}</h3>
                <p className="text-gray-600 text-sm truncate">
                  {song.artists.map((artist) => artist.name).join(", ")}
                </p>
                <button
                  onClick={() => toggleAddToPlaylist(song)}
                  className="mt-4 bg-gray-400 text-white p-2 rounded-full hover:bg-gray-600 transition duration-200"
                >
                  <FaPlusCircle />
                </button>
              </div>
            ))}
        </div>
      )}
      {isOpen === true && (
        <AddToPlaylist
          isOpen={isOpen}
          toggleAddToPlaylist={toggleAddToPlaylist}
          track={trackID}
        />
      )}
    </div>
  );
}

export default PlayList;
