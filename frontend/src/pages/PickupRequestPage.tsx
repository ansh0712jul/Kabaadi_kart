

import  { useState, useEffect } from "react"
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
import { Label } from "@/components/ui/label"


// type definition for state
interface State {
  id: number
  name: string
}

// schema for zod validation
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
  sellOrDonate: z.enum(["Sell", "Donate"]),
  img: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
})

// type definition for from data
type PickupRequestFormData = z.infer<typeof pickupRequestSchema>

function PickupRequestPage() {
  const categories = ["Metal", "Plastic", "Paper", "Battery", "Electronic Devices", "Glass", "Clothing", "Other"]
  const [selectedcategories, setSelectedCategories] = useState<string[]>([])
  const [isOpen , setIsOpen] = useState(false)
  const [state, setState] = useState<State[]>([])

  // function to add or remove selected category
  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category) ? prevSelected.filter((item) => item !== category) : [...prevSelected, category],
    )
  }
  const toggleDialog = () =>{
    setIsOpen(!isOpen)
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
    setValue("category", selectedcategories)
  }, [selectedcategories, setValue])

  const onSubmit = async (data: PickupRequestFormData) => {
    console.log(data)
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
      console.log("Pickup request submitted:", response.data)
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
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="backdrop-blur-lg bg-white/10 shadow-2xl sm:w-[38rem] md:w-[50rem] overflow-auto scroll-sm">
          <CardHeader className="text-center text-purple-500">
            <CardTitle className="text-3xl font-bold">Pickup Request</CardTitle>
            <CardDescription className="text-lg text-purple-300">Fill in the details to request a pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Your Phone Number"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("phone")}
                  />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickUpDate" className="text-white">
                    Pick-Up Date
                  </Label>
                  <Input
                    id="pickUpDate"
                    type="date"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("pickUpDate")}
                  />
                  {errors.pickUpDate && <p className="text-xs text-red-400">{errors.pickUpDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickUpTime" className="text-white">
                    Pick-Up Time
                  </Label>
                  <Input
                    id="pickUpTime"
                    type="time"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("pickUpTime")}
                  />
                  {errors.pickUpTime && <p className="text-xs text-red-400">{errors.pickUpTime.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="street" className="text-white">
                    Street
                  </Label>
                  <Input
                    id="street"
                    placeholder="Street Address"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("street")}
                  />
                  {errors.street && <p className="text-xs text-red-400">{errors.street.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("city")}
                  />
                  {errors.city && <p className="text-xs text-red-400">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">
                    State
                  </Label>
                  <Select onValueChange={(value) => setValue("state", value)}>
                    <SelectTrigger id="state" className="w-full bg-white/20 border-0 text-white">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.map((states) => (
                        <SelectItem key={states.id} value={states.name}>
                          {states.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-400">{errors.state.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal" className="text-white">
                    Postal Code
                  </Label>
                  <Input
                    id="postal"
                    placeholder="Postal Code"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("postal")}
                  />
                  {errors.postal && <p className="text-xs text-red-400">{errors.postal.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    className="w-full bg-white/20 border-0 text-white placeholder-gray-300"
                    {...register("country")}
                  />
                  {errors.country && <p className="text-xs text-red-400">{errors.country.message}</p>}
                </div>
                <div className="relative inline-block w-full space-y-1 sm:col-span-2">
                  <Label className="text-white">Categories</Label>
                    <button
                    type = "button"
                    className="w-full bg-white/20 border-0 text-gray-200 rounded-md px-4 py-2 hover:bg-white/30 flex justify-between"
                    onClick={toggleDialog}>
                      {
                        selectedcategories.length > 0 ? selectedcategories.join(", ") : "Select Categories"
                      }
                      <span className="float right ">▼
                      </span>
                    </button>
                    {
                      isOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-48 overflow-y-auto">
                          <ul className="p-2">
                            {
                              categories.map((category) => (
                                <li>
                                  <input
                                  type="checkbox"
                                  id={category}
                                  value={category}
                                  checked={selectedcategories.includes(category)}
                                  onChange={() => handleCheckboxChange(category)}
                                  className="form-checkbox h-4  text-indigo-600 transition duration-150 ease-in-out w-4"
                                  />
                                  <label htmlFor={category} className="ml-2 text-sm font-medium text-gray-900">{category}</label>
                                </li>
                                
                              ))}
                          </ul>
                        </div>
                      )
                    }
                  
                  {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-white">Sell or Donate</Label>
                  <div className="flex items-center space-x-4">
                    {/* Sell Checkbox */}
                    <div className="flex items-center space-x-2">
                      <input
                        id="sell"
                        type="radio"
                        value="Sell"
                        className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        {...register("sellOrDonate")}
                      />
                      <label htmlFor="sell" className="text-gray-200">
                        Sell
                      </label>
                    </div>

                    {/* Donate Checkbox */}
                    <div className="flex items-center space-x-2">
                      <input
                        id="donate"
                        type="radio"
                        value="Donate"
                        className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        {...register("sellOrDonate")}
                      />
                      <label htmlFor="donate" className="text-gray-200">
                        Donate
                      </label>
                    </div>
                  </div>
                  {errors.sellOrDonate && <p className="text-xs text-red-400">{errors.sellOrDonate.message}</p>}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="img" className="text-white">
                    Upload Image
                  </Label>
                  <Input
                    id="img"
                    type="file"
                    className="w-full bg-white/20 border-0 text-white file:bg-purple-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-purple-600"
                    {...register("img")}
                  />
                  {errors.img && <p className="text-xs text-red-400">{errors.img.message}</p>}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-4 text-lg bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 "
              >
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default PickupRequestPage

