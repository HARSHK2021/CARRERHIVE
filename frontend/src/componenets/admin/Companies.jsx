/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Navbar from '@/componenets/Navbar'
import React, { useEffect, useState } from 'react'


import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CompaniesTable from './CompaniesTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 bg-slate-200 border border-slate-400 shadow-2xl rounded-lg'>
                <div className='flex items-center justify-between my-5 p-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="glow-on-hover" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
