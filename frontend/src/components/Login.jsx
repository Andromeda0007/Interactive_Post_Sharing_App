import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../redux/userSlice'; // ✅ Updated action
import { USER_API_END_POINT } from '../utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { username, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch(setLoggedInUser(res?.data?.user)); // ✅ Correct action
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login app w-full h-screen flex justify-center items-center bg-gray-50">
      <div className='bg-white w-[75%] h-[90%] shadow-2xl flex'>
        
        {/* Left Side: Logo */}
        <div className="logo w-[43%] flex items-center justify-center flex-col ">
          <Link to="/">
            <img 
              src="https://img.freepik.com/free-vector/money-rainbow-logo-design_474888-2243.jpg?semt=ais_hybrid&w=740"
              alt="Twitter Logo" 
              className="max-w-full max-h-full object-contain"
            />
          </Link>
          <div className='mt-[-20px] px-2'>
            <h1 className='text-[40px] font-bold pl-4 text-gray-800'>Say More!!</h1>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form w-[57%] py-7 px-9 border-l-2 border-gray-50 items-center flex flex-col">
          <form
            onSubmit={SubmitHandler}
            className='login_authentication w-full px-4 py-2 flex flex-col bg-gray-50 rounded-2xl'
          >
            <h1 className='text-[35px] mb-4'>Log In</h1>

            <input 
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder='Username'
              className='h-[40px] w-full p-2 mb-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            />
            <h6 className='mb-4 ml-1 text-gray-400 text-[11px]'>Login via OTP</h6>

            <input 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='h-[40px] w-full p-2 mb-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
            />
            <h6 className='mb-3 ml-1 text-blue-700 text-[11px] cursor-pointer hover:underline'>Forgot Password?</h6>

            <button className='login_button w-full bg-blue-500 hover:bg-blue-600 rounded-full px-5 py-3 my-2 text-white cursor-pointer transition-colors'>
              Login
            </button>

            <Link to={"/signup"}>
              <div className='login_button w-full bg-gray-300 hover:bg-gray-400 rounded-full px-5 py-3 mt-1 text-center cursor-pointer transition-colors'>
                <span>Don't have an Account? </span>
                <span className='font-semibold text-blue-700'>Sign Up</span>
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

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
