import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import {  User, Lock } from 'lucide-react'
import "../App.css"
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// schema for validation 
const signInSchema = z.object({
  email: z
  .string()
  .email({message:"Invalid email format"})
  .nonempty("email is required"),
  password: z
  .string()
  .nonempty("Password is required")

})


// type defintion of form data

type SignInFormData = z.infer<typeof signInSchema>
const SignIn = () => {
 
  // initializing the  react hook form with zod Resolver
  const { 
    register, 
    handleSubmit, 
    formState: { errors } } = useForm<SignInFormData>({
      resolver: zodResolver(signInSchema),
  })

  // handle form submission

  const handleLogin = (data: SignInFormData) => {
    console.log(data);
  }


  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 p-4">
      <Card 
        className={`w-full max-w-md rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8 transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="mb-6">
          <h1 className="text-4xl font-bold text-center text-white">Welcome Back 🥳</h1>
          <p className="text-center text-lg text-gray-200 mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form 
          onSubmit={handleSubmit((handleLogin)) }
          className="space-y-6">
            <div className="relative">
              <User className={`absolute left-3  ${errors.email ? 'top-1/3' : "top-1/2"} transform -translate-y-1/2 text-gray-600`}/>
              <Input
                className={`pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300`}
                type="text"
                placeholder="username or email"
                {
                  ...register("email")
                }
              />
              {
                errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )
              }
            </div>

            <div className="relative">
              <Lock className={`absolute left-3  ${errors.password ? 'top-1/3' : "top-1/2"} transform -translate-y-1/2 text-gray-600`} />
              <Input
                className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="password"
                placeholder="Your password"
                {
                  ...register("password")
                }
              />

              {
                errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )
              }
            </div>

            <Button className="w-full text-xl py-6 mt-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-6 text-center">
          <p className="text-lg text-gray-200">
            Create new Account.{" "}
            <Link to="/sign-up" className="text-white font-semibold underline hover:text-teal-200 transition-colors duration-300">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SignIn

