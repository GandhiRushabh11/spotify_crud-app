import Appbar from "../components/Appbar";
import { useNavigate } from "react-router";
import PlayList from "./Playlist";
import { getSpotifyToken } from "../services/spotify";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tokenStatus, setTokenStatus] = useState(false);
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
        setTokenStatus(true);
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
        {tokenStatus ? (
          <PlayList />
        ) : (
          <div className="text-center text-gray-500 text-xl mt-8">
            Loading ...
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
