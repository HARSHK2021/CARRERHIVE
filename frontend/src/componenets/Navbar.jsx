/* eslint-disable no-unused-vars */
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utlis/constant";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <div className="wrapper">
            <svg>
              <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                CareerHive
              </text>
            </svg>
          </div>
        </div>
        <div className="flex  items-center gap-7">
          <ul className="flex   items-center gap-7 font-bold ">
            {
              user && user.role === 'recruiter' ?(
                <>
                <li>
              <Link to="/admin/companies">Companies</Link>
            </li>
            <li>
              <Link to="/admin/jobs"> Jobs</Link>
            </li>
                </>

                
              ):(
                <>
                <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs"> Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
                </>

              )
            }
            
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                {" "}
                <Button className="" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                {" "}
                <Button className="glow-on-hover w-fit">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@pic"
                  ></AvatarImage>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-slate-100 shadow-lg">
                <div>
                  <div className="flex gap-4 space-y-2 ">
                    <Avatar className="cursor-pointer ">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@pic"
                      ></AvatarImage>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      {/* <p className="text-sm text-muted-foreground  hover:text-foreground ">
                        {user?.profile?.bio}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600 mt-3 ">
                    {
                      user && user.role === 'student' && (<div className="flex w-fit items-center gap2 cursor-pointer  hover:text-red-700">

                        <User2 />
                        <Button
                          className="hover:scale-110 ease-in-out"
                          variant="link"
                        >
                          <Link to="/profile"> View Profile</Link>
                        </Button>
                      </div>)
                    }
                    
                    <div className="flex w-fit items-center gap2 cursor-pointer hover:text-red-700">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        className="hover:scale-110 ease-in-out"
                        variant="link"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
