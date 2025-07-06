import Navbar from "../common/Navbar";
import { useState } from "react";
import interviewBackground from '../assets/interview-bg.webp'
import React, { useRef } from "react";
import { loginApi, signUp } from "../apis/auth";
import { data } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

export default function LoginSignUp() {
  const [login, setlogin] = useState(false)
  const usernameRef =  useRef();
  const emailRef = useRef();
  const passwordRef = useRef() 
  const errorRef = useRef()
  const [isError, errorOccured] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");

  const signupLogin=async(e)=>{
    e.preventDefault();
    if(!login){
    const data = {
      "name": usernameRef.current.value,
      "email":emailRef.current.value,
      "password":passwordRef.current.value
    }
        try {
          const res = await signUp(data)
          localStorage.setItem({"detail":{"access_token":res.token,"type":res.token_type}})
          
        }
        
        catch(err){
            errorOccured(true)
            setErrorMsg(err.message)
        }}
    
        if(login){
          const data = {
          "email":emailRef.current.value,
          "password":passwordRef.current.value
         }
         console.log(data)
        try {
          const res = await loginApi(data)
          console.log(res)
          localStorage.setItem({"detail":{"access_token":res.token,"type":res.token_type}})
          
        }
        catch(err){
            errorOccured(true)
           
            setErrorMsg(err.message)
        }}
      
}

 

  const setToLogin=()=>{
    setlogin(true)
  }
  const setToSignup=()=>{
    setlogin(false)
  }

  return (
    
    <div>
      <div className="hidden dark:block fixed w-full h-screen top-0 left-0 z-0 dark:bg-[url('../src/assets/interview-bg.webp')] bg-no-repeat bg-cover opacity-0 dark:opacity-30 transition-opacity duration-300"></div>
    <Navbar></Navbar>
    

    <div className="w-[40%] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md p-[50px] dark:bg-transparent shadow-common-shadow ">
    
    {!login && (
      <div className="mb-5">
      <h1 className="text-h1-size font-semibold mb-2">Create an Account</h1>
      <p>Already have an account ?<a className="cursor-pointer" onClick={setToLogin}> Log in</a></p>
      </div>
    )}
    {login && (
      <div className="mb-5">
      <h1 className="text-h1-size font-semibold mb-2">Log in</h1>
      <p>New User?<a className="cursor-pointer" onClick={setToSignup}> Register Now</a></p>
      </div>
    )}

    <form onSubmit={signupLogin}>
      {!login &&(
      <input
        name="username"
        onChange={() => {
          errorOccured(false);
        }}
        placeholder="Username"
        type="text"
        ref={usernameRef}
        className="shadow-common-shadow p-2 rounded w-full bg-transparent text-black placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 dark:bg-white my-2"
        required
      />
      )}
      <input name="email" placeholder="Email" type="email" 
      ref={emailRef}
      onChange={() => {
          errorOccured(false);
        }}
      className="shadow-common-shadow p-2 rounded w-full bg-transparent text-black placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 dark:bg-white my-2" autoComplete={login ? "email" : "off"} required></input>

      <input name="password" placeholder="Password" type="password" 
      autoComplete={login ? "password" : "new-password"}
      ref={passwordRef}
      onChange={() => {
          errorOccured(false);
        }}
      className="shadow-common-shadow p-2 rounded w-full bg-transparent text-black placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 dark:bg-white my-2"
       required></input>

     {isError && (
      <div className="bg-red-200 p-1 w-fit">
          <p className="text-red-500 flex items-center gap-2 text-sm">
            <AiOutlineWarning className="text-lg" />
           {errorMsg}
          </p>
          </div>
        )}
       
      {!login &&( 
      <input name="confirmpassword" placeholder="Confirm Password" type="password"
      onChange={() => {
          errorOccured(false);
        }}
      className="shadow-common-shadow p-2 rounded w-full bg-transparent text-black placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 dark:bg-white my-2"
      required></input>
     
        )}
       <button type="submit"className="w-full px-4 py-2 rounded dark:bg-brand-button-bg text-white bg-brand-button-bg border-none transition dark:hover:bg-brand-button-hover-bg hover:bg-brand-button-hover-bg mb-2 mt-2">
        
            {login ? "Login" : "Sign Up"}
          </button>
    <button className="w-full px-4 py-2 rounded dark:bg-brand-danger text-white bg-brand-danger border-none transition hover:bg-brand-button-hover-bg mb-2 mt-2">
            Continue with Google
          </button>

    </form>
    </div>
     
    </div>
    
    
  );
}
