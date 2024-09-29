/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './shared/Footer'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from "../componenets/LatestJobs"
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
        <Navbar></Navbar>
        <HeroSection/>
        <CategoryCarousel/>
       <LatestJobs/>
       <Footer/>
       
    </div>
  )
}

export default Home
