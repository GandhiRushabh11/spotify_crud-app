import Appbar from "../components/Appbar";
import { useNavigate } from "react-router";
import PlayList from "./Playlist";
import { getSpotifyToken } from "../services/spotify";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const getSpotifyAccessToken = async () => {
    const userToken = localStorage.getItem("token");
    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if  token doesn't exist
    } else {
      try {
        const spotifyToken = await getSpotifyToken();
        //Setting Up spotifyToken For user
        localStorage.setItem("spotifyToken", spotifyToken);
      } catch (error) {
        toast.error("Session expired, please login again.");
      }
    }
  };
  useEffect(() => {
    getSpotifyAccessToken();
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <PlayList />
      </div>
    </div>
  );
};

export default Dashboard;
