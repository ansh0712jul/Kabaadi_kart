'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { Mail, User, Lock } from 'lucide-react'
import "../App.css"

const SignUp = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 p-4">
      <Card 
        className={`w-full max-w-md rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8 transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="mb-6">
          <h1 className="text-4xl font-bold text-center text-white">Create Your Account</h1>
          <p className="text-center text-lg text-gray-200 mt-2">Join us and start your journey!</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <Input
                className=" pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <Input
                className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="text"
                placeholder="Choose a username"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <Input
                className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="password"
                placeholder="Create a password"
              />
            </div>

            <Button className="w-full text-xl py-6 mt-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-6 text-center">
          <p className="text-lg text-gray-200">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-white font-semibold underline hover:text-teal-200 transition-colors duration-300">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp

