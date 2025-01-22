import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface Address {
  city: string;
  country: string;
  postal: string;
  state: string;
  street: string;
  createdAt: string; 
  updatedAt: string; 
  _id: string;
}

export interface pickUpRequest {
  address: Address;
  category: string[]; 
  email: string;
  img: string; 
  name: string;
  phone: string;
  pickUpDate: string; 
  pickUpTime: string; 
  sellOrDonate: "Sell" | "Donate"; 
  status: "Pending" | "Completed" | "Canceled"; 
  acceptedBy?: string;
  collectorName?: string;
  collectorEmail?: string;
  collectorPhn?: string;
  __v: number;
  _id: string;
}


const ProfilePage: React.FC = () => {
  const [pickUpRequests, setPickUpRequests] = useState<pickUpRequest[]>([])
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    axios
      .get("http://localhost:8068/request/get-pickup-request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPickUpRequests(res.data.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Header buttonText="Make Request" navigateTo="pickup-request" />
      <main className="container mx-auto px-4 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl"
        >
          <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gray-700 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-400">Name</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
              </div>
            </motion.div>
            <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Pickup Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pickUpRequests.map((request, index) => (
                <motion.div
                  key={request._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-gray-700 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Request #{index + 1}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === "Pending"
                          ? "bg-yellow-500 text-yellow-900"
                          : request.status === "Completed"
                            ? "bg-green-500 text-green-900"
                            : "bg-red-500 text-red-900"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span className="text-white">{request.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone</span>
                      <span className="text-white">{request.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{request.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pickup Date</span>
                      <span className="text-white">{new Date(request.pickUpDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pickup Time</span>
                      <span className="text-white">{request.pickUpTime}</span>
                    </div>
                    {request.collectorName && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Collector</span>
                        <span className="text-white">{request.collectorName}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={request.status !== "Pending"}
                    >
                      Complete
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white" disabled={request.status !== "Pending"}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage;