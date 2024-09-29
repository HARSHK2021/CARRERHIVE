/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utlis/constant'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {

    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
         <div>
            <Navbar />
            <div className='max-w-2xl mx-auto bg-slate-200 p-4 m-5 border mt-20 border-slate-400 shadow-2xl rounded-lg'>
                <div className='my-10 bg-slate-300 rounded-md p-2'>
                    <h1 className='font-bold text-2xl text-center'>Your Company Name</h1>
                    <p className='text-gray-500 text-center'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button className="glow-on-hover w-fit" onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default CompanyCreate
