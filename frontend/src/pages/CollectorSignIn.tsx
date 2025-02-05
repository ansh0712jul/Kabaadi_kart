import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from 'lucide-react';
import "../App.css";


const signInSchema = z.object({
  collectorEmail: z.string().email({ message: 'Invalid email format' }).nonempty('Email is required'),
  password: z.string().min(4, { message: 'Password must be at least 4 characters long' }).nonempty('Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const CollectorSignIn = () => {
  const navigate = useNavigate();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const handleLogin = async (data: SignInFormData) => {
    
    try {
      const response = await axios.post('http://localhost:8068/collector/sign-in', data);
      
      const { accessToken, refreshToken,collector} = response.data.data;

      localStorage.setItem('accessTokenCollector', accessToken);
      localStorage.setItem('refreshTokenCollector', refreshToken);

      console.log("token  ->",accessToken);
      

      console.log("collector "+ JSON.stringify(collector));
      const collector1 = {
        name: collector.collectorName,
        email: collector.collectorEmail,
      };

      localStorage.setItem('collector', JSON.stringify(collector1));

      // setUser(collector1); // Set user details in context

      console.log('Login successful');
      navigate('/collector-dashboard'); // Redirect to profile page
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <Card
        className={`w-full max-w-md rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8 transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="mb-6">
          <h1 className="text-4xl font-bold text-center text-green-700">Sign In</h1>
          <p className="text-center text-lg text-gray-300 mt-2">Welcome back! Please login to your account.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 ${errors.collectorEmail ? 'top-1/3' : 'top-1/2'}`} />
              <Input
                className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="text"
                placeholder="Enter your email"
                {...register("collectorEmail")}
              />
              {errors.collectorEmail && <p className="text-sm text-red-500 mt-1">{errors.collectorEmail.message}</p>}
            </div>

            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 font-bold ${errors.password ? 'top-1/3' : 'top-1/2'}`} />
              <Input
                className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <Button className="w-full text-xl py-6 mt-4 bg-green-500 hover:bg-green-600 text-gray-900  focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105">
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="mt-6 text-center">
          <p className="text-lg text-gray-200">
            Don't have an account?{" "}
            <span
            onClick={() => navigate('/collector/sign-up')} 
            className="text-white font-semibold underline hover:text-teal-200 transition-colors duration-300 cursor-pointer">
                Sign Up
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CollectorSignIn;