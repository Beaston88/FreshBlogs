import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  // S-1 : We have created our project with vite and we are trying to set and access our environment variables with CREATE_REACT, so it won't work. Now we changed the name
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  
  // S-8 : We are now setting our states 
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
          <main>
            <Outlet/>
          </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
