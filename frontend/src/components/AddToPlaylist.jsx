import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./Button";

function AddToPlaylist({ isOpen, toggleAddToPlaylist, track }) {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPlaylistID] = useState("");
  const userToken = localStorage.getItem("token");
  const handleModel = () => {
    toggleAddToPlaylist(!isOpen);
  };

  const getPlaylists = async () => {
    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if  token doesn't exist
    } else {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + "/api/v1/playlist",
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        console.log(response.data.data);

        setPlaylists(response.data.data);
      } catch (error) {
        toast.error("Error fetching playlist");
      }
    }
  };

  const addTrackToPlaylist = async () => {
    try {
      const updatedPlaylist = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/api/v1/playlist/${playlistID}/song`,
        { title: track.name, duration: track.duration_ms, songId: track.id },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(updatedPlaylist);

      toggleAddToPlaylist(!isOpen);
      toast.success("Song has been added to your playlist.");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      toggleAddToPlaylist(!isOpen);
    }
  };
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add To PlayList
          </h3>
          <button
            type="button"
            onClick={handleModel}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Form */}
        {playlists.length > 0 ? (
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Name Field */}
              <div className="col-span-2">
                <label
                  htmlFor="track"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Track Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={track.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type product name"
                  disabled
                />
              </div>

              {/* Price Field */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Track duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={(track.duration_ms / 60000).toFixed(2)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  disabled
                />
              </div>

              {/* Category Field */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="playlist"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Playlist
                </label>
                <select
                  id="playlist"
                  onChange={(e) => setPlaylistID(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option>Select PlayList</option>
                  {playlists.length > 0 &&
                    playlists.map((playlist) => (
                      <option key={playlist._id} value={playlist._id}>
                        {playlist.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              label="Add To Playlist"
              onClick={() => {
                addTrackToPlaylist();
              }}
            />
          </form>
        ) : (
          <div className="p-4 md:p-5 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please create a playlist first.
            </p>
            <Link
              to="/manage-playlist"
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              Go to Create Playlist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddToPlaylist;
