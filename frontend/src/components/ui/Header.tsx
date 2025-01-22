
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'
import {  useNavigate } from "react-router-dom"

export default function Header({buttonText, navigateTo}: {buttonText: string, navigateTo?: string}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/80 backdrop-blur-xl' : ""
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-white">
          Kabadikart
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
            <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            <li><a href="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</a></li>
          </ul>
        </nav>
        <Button 
        onClick={() => {
          
          navigate(`/${navigateTo}`);
        }}
         className= "w-36 text-md text-white shadow-lg bg-gradient-to-r from-purple-700 to-purple-600  rounded-lg hover:from-purple-700 hover:to-purple-600">
          {buttonText }
          </Button>
      </div>
    </header>
  )
}

