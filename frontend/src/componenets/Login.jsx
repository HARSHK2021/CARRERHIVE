/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {  EyeIcon, Loader2 } from "lucide-react";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //api call from backend
    try {
      dispatch(setLoading(true));
      
      const res = await axios.post(`https://carrerhive.onrender.com/api/v1/user/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex item-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-lg bg-slate-100"
        >
          <h1 className="font-bold text-xl mb-5">
            <span>Login</span>
          </h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="xyz@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2 ">
            <Label className="flex justify-between ">
              Password
              <EyeIcon
                onClick={() => setShowPassword("text")}
                className="w-fit"
              />
            </Label>
            <Input
              type={showPassword}
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="glow-on-hover w-full ">
              {" "}
              <Loader2 className="mr-2 h-4 animate-spin w-4 " /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full glow-on-hover my-4">
              Login
            </Button>
          )}
          <div>
            <span className="text-sm ">
              {" "}
              don't have an account!
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
