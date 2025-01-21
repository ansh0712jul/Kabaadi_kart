import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import "../App.css";

interface State {
  id: number;
  name: string;
}

const pickupRequestSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z.string().nonempty("Phone is required"),
  pickUpDate: z.string().nonempty("Pick-Up Date is required"),
  pickUpTime: z.string().nonempty("Pick-Up Time is required"),
  category: z.string().nonempty("Category is required"),
  street: z.string().nonempty("Street is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  postal: z.string().nonempty("Postal Code is required"),
  country: z.string().nonempty("Country is required"),
  img: z.instanceof(FileList).refine(files => files.length > 0, "Image is required"),
});

type PickupRequestFormData = z.infer<typeof pickupRequestSchema>;

function PickupRequestPage() {
  const [states, setStates] = useState<State[]>([]);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<PickupRequestFormData>({
    resolver: zodResolver(pickupRequestSchema),
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:8068/api/states');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const onSubmit = async (data: PickupRequestFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('pickUpDate', data.pickUpDate);
    formData.append('pickUpTime', data.pickUpTime);
    formData.append('category', data.category);
    formData.append('street', data.street);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('postal', data.postal);
    formData.append('country', data.country);
    formData.append('img', data.img[0]);

    try {
      const response = await axios.post('http://localhost:8068/api/make-pickup-request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Pickup request submitted:', response.data);
      navigate('/home'); 
    } catch (error) {
      console.error('Error submitting pickup request:', error);
      
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 p-4">
      <Card
        className={`w-full max-w-4xl rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8 transition-all duration-300 ease-in-out ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="mb-6">
          <h1 className="text-4xl font-bold text-center text-white">Pickup Request</h1>
          <p className="text-center text-lg text-gray-200 mt-2">Fill in the details to request a pickup</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-200 mb-2">Name</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Email</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Phone</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Pick-Up Date</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="date"
                  placeholder="Select pick-up date"
                  {...register("pickUpDate")}
                />
                {errors.pickUpDate && <p className="text-sm text-red-500 mt-1">{errors.pickUpDate.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Pick-Up Time</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="time"
                  placeholder="Select pick-up time"
                  {...register("pickUpTime")}
                />
                {errors.pickUpTime && <p className="text-sm text-red-500 mt-1">{errors.pickUpTime.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Category</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter category"
                  {...register("category")}
                />
                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Street</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter street"
                  {...register("street")}
                />
                {errors.street && <p className="text-sm text-red-500 mt-1">{errors.street.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">City</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter city"
                  {...register("city")}
                />
                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">State</label>
                <select
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  {...register("state")}
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Postal Code</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter postal code"
                  {...register("postal")}
                />
                {errors.postal && <p className="text-sm text-red-500 mt-1">{errors.postal.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Country</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="text"
                  placeholder="Enter country"
                  {...register("country")}
                />
                {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>}
              </div>

              <div className="relative">
                <label className="block text-gray-200 mb-2">Image</label>
                <Input
                  className="w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                  type="file"
                  {...register("img")}
                />
                {errors.img && <p className="text-sm text-red-500 mt-1">{errors.img.message}</p>}
              </div>
            </div>

            <Button className="w-full text-xl py-6 mt-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105">
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PickupRequestPage;