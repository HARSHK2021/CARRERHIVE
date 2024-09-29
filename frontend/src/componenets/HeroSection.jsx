/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setqQuery] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse");
    }
  

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="  mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#F62435] ">
          Connecting You to a World of Opportunities!
        </span>

        <h1 className="text-5xl font-bold ">
          Search, Apply & <br />
          Get Your <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p>
          {" "}
          Join the hive and explore a world where talent and opportunity come
          together, empowering you to build a brighter future.
        </p>
      </div>
      <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto ">
        <input
          type="text"
          onChange={(e)=> setqQuery(e.target.value)}
          className="outline-none border-none w-full bg-inherit text-center"
          placeholder="Find your dream job"
        />
        <Button onClick={searchJobHandler} className="rounded-r-full"><Search className="h-5 w-5"/></Button>
      </div>
      
    </div>
  );
};

export default HeroSection;
