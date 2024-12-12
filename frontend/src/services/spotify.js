import axios from "axios";
import { toast } from "react-toastify";

// Search Spotify songs
export const searchNewReleases = async (token) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 10,
        offset: 5,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Error searching songs from Spotify:", error);
    throw error;
  }
};

// Search Spotify songs
export const searchSpotify = async (query, token) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Error searching songs from Spotify:", error);
    throw error;
  }
};

// Get Spotify token
export const getSpotifyToken = async () => {
  const credentials = btoa(
    `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${
      import.meta.env.VITE_SPOTIFY_SECRET_ID
    }`
  );
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    console.log(response.data);
    return response.data.access_token;
  } catch (error) {
    console.log("Error fetching Spotify token:", error);
    throw error;
  }
};
