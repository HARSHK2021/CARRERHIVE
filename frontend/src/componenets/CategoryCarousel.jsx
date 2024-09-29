/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setSearchedQuery } from "@/redux/jobSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backtend Developer",
  "Graphic Developer",
  "FullStack Developer",
  "Data Science",
  "Data Analyst",
  "Cloud Engineer",
];

const CategoryCarousel = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate("/browse");
    }
  
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {

                category.map((cat,index)=>( 
                <CarouselItem className="md:basis-1/2 lg-basis-1/3 " key={cat}>
                    <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full  bg-slate-100 shadow-lg border border-gray-200">{cat}</Button>
                    
                </CarouselItem>))
            }
         
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
