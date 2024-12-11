import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";

const Appbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userToken = localStorage.getItem("token");
  const getLoggedUser = async () => {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/api/v1/",
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    setUser(response.data.data);
  };
  useEffect(() => {
    getLoggedUser();
  }, []);

  function signOutHandler() {
    localStorage.removeItem("token");
    toast.success("Logout!!!");
    navigate("/signin");
  }
  return (
    <div className="shadow h-14 flex justify-between items-center md:px-10">
      <Link to={"/dashboard"}>
        <div className="flex flex-col h-full ml-4 font-bold">Spotify</div>
      </Link>
      <div className="flex items-center gap-2">
        {<Button label={"Sign Out"} onClick={signOutHandler}></Button>}
        <div className="flex flex-col h-full mr-4">{user.username}</div>
        <div className="rounded-full h-10 w-10 p-4 bg-slate-200 flex justify-center mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {"S"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
