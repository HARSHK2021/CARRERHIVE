/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
      setSelectedValue(value);
  }
  useEffect(()=>{
      dispatch(setSearchedQuery(selectedValue));
  },[selectedValue]);

  return (
    <div className='w-full bg-slate-200 p-3 rounded-md shadow-2xl'>
    <h1 className='font-bold text-lg'>Filter Jobs</h1>
    <hr className='mt-3' />
    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
            fitlerData.map((data, index) => (
                <div key={index}>
                    <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                    {
                        data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`
                            return (
                                <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
    </RadioGroup>
</div>
  );
};

export default FilterCard;
