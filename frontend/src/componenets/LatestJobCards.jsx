/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-2xl bg-slate-200 border border-gray-300 cursor-pointer hover:scale-105 '>
            <div >
                <div className='flex items-center gap-2'>
                    <img className='h-10 w-10 rounded-full' src={job?.company?.logo} alt="" />
                <h1 className='font-bold text-lg'>{job?.company?.name}</h1>

                </div>
              
                <p className='text-sm text-gray-500'>{job?.company?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold bg-white'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold bg-white'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold bg-white'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
       





    )
}

export default LatestJobCards
