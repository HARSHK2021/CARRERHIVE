
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './componenets/Home'
import Login from './componenets/Login'
import Signup from './componenets/Signup'
import Jobs from './componenets/Jobs'
import Browse from './componenets/Browse'
import Profile from './componenets/Profile'
import JobDescription from './componenets/JobDescription'
import Companies from './componenets/admin/Companies'
import CompanyCreate from './componenets/admin/CompanyCreate'
import CompanySetup from './componenets/admin/CompanySetup'
import AdminJobs from './componenets/admin/AdminJobs'
import PostJob from './componenets/admin/PostJob'
import Applicants from './componenets/admin/Applicants'
import ProtectedRoute from './componenets/admin/ProtectedRoute'

const appRouter = createBrowserRouter([
  {
    path:"/", element:<Home/>
  },
  {
    path:"/login", element:<Login/>
  },
  {
    path:"/signup", element:<Signup/>
  },
  
  {
    path:"/jobs", element:<Jobs/>
    
  },
  
  {
    path:"/description/:id", element:<JobDescription/>

  },
  
  {
    path:"/browse", element:<Browse/>
  },
  {
    path:"/profile", element:<Profile/>
  },
  

  ///admin routes
  {
    path:"/admin/companies", element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  
  {
    path:"/admin/companies/create", element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  
  {
    path:"/admin/companies/:id", element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  
  {
    path:"/admin/jobs", element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create", element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants", element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  


  
  
 
])

function App() {
  

  return (
    <div>
    <RouterProvider router = {appRouter}/>
     
    </div>
  )
}

export default App
