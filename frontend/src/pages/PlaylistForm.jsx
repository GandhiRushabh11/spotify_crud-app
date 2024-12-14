import Appbar from "../components/Appbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const PlaylistForm = () => {
  const [playlists, setPlaylists] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const userToken = localStorage.getItem("token");

  // Handling form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add a new playlist
  const handleAdd = async () => {
    if (form.title && form.description) {
      try {
        const newPlaylist = await axios.post(
          import.meta.env.VITE_SERVER_URL + `/api/v1/playlist/`,
          { title: form.title, description: form.description },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        console.log(newPlaylist.data.data);
        setPlaylists([...playlists, newPlaylist.data.data]);
        setForm({ title: "", description: "" });
      } catch (error) {
        console.error("Error adding playlist:", error);
      }
    }
  };

  // Edit an existing playlist
  const handleEdit = (id) => {
    const playlist = playlists.find((p) => p._id === id);
    setForm({ title: playlist.title, description: playlist.description });
    setIsEditing(true);
    setEditId(id);
  };

  // Update playlist
  const handleUpdate = async () => {
    try {
      const updatedPlaylist = await axios.put(
        import.meta.env.VITE_SERVER_URL + `/api/v1/playlist/${editId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setPlaylists(
        playlists.map((p) => (p._id === editId ? updatedPlaylist.data.data : p))
      );
      setForm({ title: "", description: "" });
      setIsEditing(false);
      setEditId(null);
      toast.success("Playlist Updated!!");
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  // Delete a playlist
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_SERVER_URL + `/api/v1/playlist/${id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setPlaylists(playlists.filter((p) => p._id !== id));
      toast.success("Playlist Deleted Successfully!!");
    } catch (error) {
      toast.error("Error while deleting playlist");
    }
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
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
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <div className="p-4 max-w-full mx-auto">
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Add New Playlist</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter playlist title"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter playlist description"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={isEditing ? handleUpdate : handleAdd}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {isEditing ? "Update Playlist" : "Add Playlist"}
            </button>
          </div>
          <h2 className="text-xl font-bold mt-8 mb-4">Playlists</h2>
          <ul className="space-y-4">
            {playlists.map((playlist) => (
              <li
                key={playlist._id}
                className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{playlist.title}</h3>
                  <p className="text-gray-600">{playlist.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(playlist._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(playlist._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistForm;
