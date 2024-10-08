/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";

import axios from "axios";;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `https://carrerhive.onrender.com/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob)); // Update the Redux state to reflect the applied status
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`https://carrerhive.onrender.com/api/v1/job/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <div
        id="box"
        className="gradient-border max-w-7xl mx-auto my-10 bg-slate-200 border border-gray-400 shadow-2xl rounded-sm p-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-3 mt-4">
              <Badge
                className={
                  "text-blue-700 font-bold  bg-slate-300 border border-gray-400 shadow-xl"
                }
                variant="ghost"
              >
                {" "}
                {singleJob?.position}
              </Badge>
              <Badge
                className={
                  "text-[#F83002] font-bold  bg-slate-300 border border-gray-400 shadow-xl"
                }
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className={
                  "text-[#7209b7] font-bold  bg-slate-300 border border-gray-400 shadow-xl"
                }
                variant="ghost"
              >
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={` glow-on-hover w-fit glow-on-hover ${
              isApplied ? "bg-gray-600 cursor-not-allowed" : "glow-on-hover"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          {" "}
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel}year
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
          {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
