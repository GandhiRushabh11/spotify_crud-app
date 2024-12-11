import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonWarning } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    // Check if token exists in local storage
    if (userToken) {
      navigate("/dashboard"); // Redirect to sign-in page if token  exist
    }
  }, []);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-96 text-center p-2 h-max px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder={"Email"}
            type={"text"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={"Password"}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={isLoading ? "Signing In..." : "Sign In"}
              onClick={async () => {
                setIsLoading(true);
                try {
                  const data = await axios.post(
                    import.meta.env.VITE_SERVER_URL + "/api/v1/login",
                    { email, password }
                  );
                  localStorage.setItem("token", data.data.token);
                  toast.success("Login successful!");
                  navigate("/dashboard");
                } catch (error) {
                  toast.error(error.response?.data?.message || "Login failed.");
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          </div>
          <ButtonWarning
            label={"Don't have an account ?"}
            to={"/signup"}
            buttonText={"SignUp"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
