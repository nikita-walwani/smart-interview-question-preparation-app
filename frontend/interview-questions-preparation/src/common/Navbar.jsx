import { useTheme } from "../common/ThemeContext";
import { useEffect, useState } from "react";
import Rubik from '../assets/rubik.png'
import LoginSignUp from '../pages/LoginSignup'


import { useNavigate } from "react-router-dom";

export default function Navbar() {
 const [isUserLoggedIn, setIsUserLoggedIn] =  useState(false)

 useEffect(() => {
   const details = JSON.parse(localStorage.getItem("details"));
   const user = details?.user;
    if(user){
        setIsUserLoggedIn(true)
      }
  }, []); // Run only once on component mount

 const { theme, toggleTheme } = useTheme();

 const navigate = useNavigate()

  const navigateToLoginPage=()=>{
    navigate('/login')
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed z-10 bg-white dark:bg-transparent text-black dark:text-white shadow-md dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <div className="text-2xl font-bold">
            <img className="w-[50px]" src={Rubik}></img>
        </div>

      
        <div className="hidden md:flex gap-4 items-center">
          <button style={{"display": isUserLoggedIn? "none" : "block"}} onClick={navigateToLoginPage} className="px-4 py-2 rounded dark:bg-brand-button-bg text-white bg-brand-button-bg border-none transition dark:hover:bg-brand-button-hover-bg hover:bg-brand-button-hover-bg">
            Login/Sign Up
          </button>
          <button
            onClick={toggleTheme}
            className="ml-2 px-3 py-2 rounded border hover:border-gray-700 text-white dark:border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button className="w-full px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
            Login/Sign Up
          </button>
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 rounded hover:bg-gray-900 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
