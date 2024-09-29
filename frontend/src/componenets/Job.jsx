/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
   
   const navigate=useNavigate();
   const daysAgoFunction = (mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const diffTime = (currentDate - createdAt)
    return Math.floor(diffTime /(1000 * 60 * 60 * 24))
   }
  return (
    <div>
          <div className='p-5 rounded-md  bg-slate-200 border border-gray-300 shadow-2xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>  {daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt)} days ago</p>
                  
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark className='w-5 h-5' /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>hello</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-blue-700 font-bold bg-white'} variant="ghost"> {job?.position}</Badge>
                <Badge className={'text-[#F83002] font-bold  bg-white'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold  bg-white'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4 flex-wrap'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
       
    </div>
  )
}

export default Job
