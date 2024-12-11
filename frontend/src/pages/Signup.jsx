import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import axios from "axios";
import { toast } from "react-toastify";
function Signup() {
  const [username, setUsername] = useState("");
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
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"Username"}
            placeholder={"UserName"}
            type={"text"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Email"}
            placeholder={"Email ID"}
            type={"email"}
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
              label={isLoading ? "Signup You ..." : "Sign up"}
              onClick={async () => {
                setIsLoading(true);
                try {
                  const response = await axios.post(
                    import.meta.env.VITE_SERVER_URL + "/api/v1/singup",
                    {
                      username,
                      email,
                      password,
                    }
                  );
                  console.log(response);
                  localStorage.setItem("token", response.data.token);
                  toast.success("User created successfully");
                  navigate("/dashboard");
                } catch (error) {
                  toast.error(
                    error.response?.data?.message ||
                      "An error occurred during Signup."
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          </div>
          <ButtonWarning
            label={"Already have account ?"}
            to={"/signin"}
            buttonText={"SignIn"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
