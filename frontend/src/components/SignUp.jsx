import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  
  return (
    <div className="login app w-full h-screen flex justify-center items-center bg-gray-50">
      <div className='bg-white w-[75%] h-[90%] shadow-2xl flex'>
        
        <div className="logo w-[43%] flex items-center justify-center flex-col ">
          <Link to="/">
            <img 
              src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.1896762506.1750320800&semt=ais_hybrid&w=740" 
              alt="Twitter Logo" 
              className="max-w-full max-h-full object-contain"
            />
          </Link>
          <div className='mt-[-50px] px-2'>
            <h1 className='text-[40px] font-bold text-gray-800'> Happening Now!!</h1>
          </div>
        </div>
        
        <div className="form w-[57%] py-7 px-9 border-l-2 border-gray-50 items-center flex flex-col">
          
          <div className='login_authentication w-full px-4 py-2 flex flex-col bg-gray-50 rounded-2xl mb-2'>
            <div className='login_text flex'>
              <h1 className=' text-[35px] mb-2 '> Sign Up </h1>
            </div>

            <input 
              placeholder='Username' 
              className='h-[40px] w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' 
            />
            <input 
              type="email" 
              placeholder='Email Id' 
              className='h-[40px] w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            />
            
            <input 
              placeholder='Enter Your Password' 
              className='h-[40px] w-full p-2 mb-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500' 
            />
            
            <div className='login_button w-full bg-blue-500 hover:bg-blue-600 rounded-full flex px-5 py-3 my-2 justify-center items-center text-white cursor-pointer transition-colors'>
              SignUp
            </div>
            
            <Link to={"/login"}>
              <div className='login_button w-full bg-gray-300 hover:bg-gray-400 rounded-full flex px-5 py-3 mt-1 justify-center items-center gap-1 cursor-pointer transition-colors'>
                <span> Already have an Account?</span>
                <span className='font-semibold text-blue-700'>Login</span>
              </div>
            </Link>
            
            <div className='flex items-center justify-center my-3'>
              <div className='w-full h-[1px] bg-gray-300 mr-2'></div>
              <div className='text-gray-400'>or</div>
              <div className='w-full h-[1px] bg-gray-300 ml-2'></div>
            </div>
            
            <div className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-[35px] mb-3 rounded-md gap-2 cursor-pointer transition-colors'>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                style={{ width: "22px", height: "22px" }}
              />
              <div>Continue with Google</div>
            </div>
            
            <div className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 h-[35px] mb-3 rounded-md gap-2 cursor-pointer transition-colors'>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Logo"
                style={{ width: "18px", height: "25px" }}
              />
              <div>Continue with Apple</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp