"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Type definition for state
interface State {
  id: number
  name: string
}

// Schema for Zod validation
const pickupRequestSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  phone: z.string().nonempty("Phone is required"),
  pickUpDate: z.string().nonempty("Pick-Up Date is required"),
  pickUpTime: z.string().nonempty("Pick-Up Time is required"),
  category: z.array(z.string()).min(1, "At least one category must be selected"),
  street: z.string().nonempty("Street is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  postal: z.string().nonempty("Postal Code is required"),
  country: z.string().nonempty("Country is required"),
  img: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
})

// Type definition for form data
type PickupRequestFormData = z.infer<typeof pickupRequestSchema>

function PickupRequestPage() {
  const categories = ["Metal", "Plastic", "Paper", "Battery", "Electronic Devices", "Glass", "Clothing", "Other"]
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<State[]>([])

  const toggleDialog = () => {
    setIsOpen(!isOpen)
  }

  // Function to add or remove selected category
  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PickupRequestFormData>({
    resolver: zodResolver(pickupRequestSchema),
  })

  const { toast } = useToast()

  useEffect(() => {
    const States: State[] = [
      { id: 1, name: "Andhra Pradesh" },
      { id: 2, name: "Arunachal Pradesh" },
      { id: 3, name: "Assam" },
      { id: 4, name: "Bihar" },
      { id: 5, name: "Chhattisgarh" },
      { id: 6, name: "Goa" },
      { id: 7, name: "Gujarat" },
      { id: 8, name: "Haryana" },
      { id: 9, name: "Himachal Pradesh" },
      { id: 10, name: "Jharkhand" },
      { id: 11, name: "Karnataka" },
      { id: 12, name: "Kerala" },
      { id: 13, name: "Madhya Pradesh" },
      { id: 14, name: "Maharashtra" },
      { id: 15, name: "Manipur" },
      { id: 16, name: "Meghalaya" },
      { id: 17, name: "Mizoram" },
      { id: 18, name: "Nagaland" },
      { id: 19, name: "Odisha" },
      { id: 20, name: "Punjab" },
      { id: 21, name: "Rajasthan" },
      { id: 22, name: "Sikkim" },
      { id: 23, name: "Tamil Nadu" },
      { id: 24, name: "Telangana" },
      { id: 25, name: "Tripura" },
      { id: 26, name: "Uttar Pradesh" },
      { id: 27, name: "Uttarakhand" },
      { id: 28, name: "West Bengal" },
      { id: 29, name: "Andaman and Nicobar Islands" },
      { id: 30, name: "Chandigarh" },
      { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu" },
      { id: 32, name: "Delhi" },
      { id: 33, name: "Jammu and Kashmir" },
      { id: 34, name: "Ladakh" },
      { id: 35, name: "Lakshadweep" },
      { id: 36, name: "Puducherry" },
    ]
  
    setState(States)
  }, [])

  // Sync multi-select categories with form state
  useEffect(() => {
    setValue("category", selectedCategories)
  }, [selectedCategories, setValue])

  const onSubmit = async (data: PickupRequestFormData) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "img") {
        formData.append(key, (value as FileList)[0])
      } else {
        formData.append(key, value as string)
      }
    })

    try {
      const response = await axios.post("http://localhost:8068/request/make-pickup-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log('Pickup request submitted:', response.data)

      toast({
        title: "Success",
        description: "Your pickup request has been submitted successfully.",
      })

      window.location.href = "/profile"
    } catch (error) {
      console.error("Error submitting pickup request:", error)
      toast({
        title: "Error",
        description: "Failed to submit pickup request. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-lg bg-white/10 shadow-2xl w-[70%] mx-auto">
          <CardHeader className="text-center text-white">
            <CardTitle className="text-2xl font-bold">Pickup Request</CardTitle>
            <CardDescription className="text-sm text-gray-200">Fill in the details to request a pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white">Name</label>
                  <Input
                    placeholder="Name"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Email</label>
                  <Input
                    placeholder="Email"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Phone</label>
                  <Input
                    placeholder="Phone"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Pick-Up Date</label>
                  <Input
                    type="date"
                    placeholder="Pick-Up Date"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("pickUpDate")}
                  />
                  {errors.pickUpDate && <p className="text-xs text-red-400">{errors.pickUpDate.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Pick-Up Time</label>
                  <Select {...register("pickUpTime")}>
                    <SelectTrigger className="w-full bg-white/20 text-white">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9-12">9-12AM</SelectItem>
                      <SelectItem value="3-6">3-6PM</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.pickUpTime && <p className="text-xs text-red-400">{errors.pickUpTime.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 text-white">
                        <input
                          type="checkbox"
                          value={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCheckboxChange(category)}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                  {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Street</label>
                  <Input
                    placeholder="Street"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("street")}
                  />
                  {errors.street && <p className="text-xs text-red-400">{errors.street.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">City</label>
                  <Input
                    placeholder="City"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("city")}
                  />
                  {errors.city && <p className="text-xs text-red-400">{errors.city.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">State</label>
                  <Select {...register("state")}>
                    <SelectTrigger className="w-full bg-white/20 text-white">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.map((s) => (
                        <SelectItem key={s.id} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-400">{errors.state.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Postal Code</label>
                  <Input
                    placeholder="Postal Code"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("postal")}
                  />
                  {errors.postal && <p className="text-xs text-red-400">{errors.postal.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Country</label>
                  <Input
                    placeholder="Country"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("country")}
                  />
                  {errors.country && <p className="text-xs text-red-400">{errors.country.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-white">Image</label>
                  <input
                    type="file"
                    className="w-full text-white"
                    {...register("img")}
                  />
                  {errors.img && <p className="text-xs text-red-400">{errors.img.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default PickupRequestPage