import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form"
import {toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const {
      register,
      handleSubmit,
    } = useForm()

    const onSubmit = async (data) => {
        try {
          let res = await fetch("https://outrageous-sisile-mehrozali-f62a59fb.koyeb.app/api/v1/user/login",{
            mode:"cors",
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            credentials:'include',
            body:JSON.stringify(data)
          })
          let response = await res.json()
          if(response.error){
            toast.error(response.error,{
              position: "top-center",
              autoClose: 1000,
            })
          }else{
            toast.success(response.message,{
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            dispatch(setAuthUser(response.data))
            navigate("/home")
          }
          
        } catch (error) {
          toast.error(error,{
            position: "top-center",
            autoClose: 1000,
          })
        }
      }
       
  return (
    <div className="min-w-96 mx-auto p-2">
      <div className="mx-2 sm:w-full sm:rounded-xl sm:p-6 sm:h-full sm:bg-gray-100 sm:bg-clip-padding sm:backdrop-filter sm:backdrop-blur-sm sm:bg-opacity-10 sm:border sm:border-gray-100">
        <h1 className="font-bold text-3xl text-center text-white">LOGIN</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label className="input input-bordered flex items-center gap-2 my-2">
            <input type="text" className="grow" placeholder="Username" {...register("username")}/>
          </label>
          <label className="input input-bordered flex items-center gap-2 my-2">
            {/* Password Input */}
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Enter your password"
              {...register("password")}
            />

            {/* Eye Toggle Button */}
            <button
              type="button"
              className="p-1"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                // Open Eye Icon (Visible Password)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12a4.5 4.5 0 1 1 4.5-4.5 4.5 4.5 0 0 1-4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5z" />
                </svg>
              ) : (
                // Closed Eye Icon (Hidden Password)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70"
                >
                  <path d="M12 4.5c-5 0-9.27 3.11-11 7.5a11.69 11.69 0 0 0 2.53 3.5L2 18.5l1.5 1.5 2.07-2.07A10.71 10.71 0 0 0 12 19.5c5 0 9.27-3.11 11-7.5a11.69 11.69 0 0 0-2.53-3.5L22 5.5l-1.5-1.5-2.07 2.07A10.71 10.71 0 0 0 12 4.5zm-2 8a2 2 0 1 1 2 2 2 2 0 0 1-2-2z" />
                </svg>
              )}
            </button>
          </label>
          <button type='submit' className="btn btn-outline w-full glass text-lg mt-3">Login</button>
        </form>
        <div className="w-full flex items-center justify-center mt-3"><Link to="/signup" className="text-white text-center" >Dont hava an Account? Signup</Link></div>
      </div>
    </div>
  )
}

export default Login