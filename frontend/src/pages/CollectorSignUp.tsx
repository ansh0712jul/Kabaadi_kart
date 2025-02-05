import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Mail, User, Lock, Smartphone, LandPlot, MapPinIcon as MapPinHouse } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import axios from "axios"

const CollectorSignUpSchema = z.object({
  collectorName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .nonempty({ message: "Username is required" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must only contain letters, numbers, and underscores"),
  collectorEmail: z.string().email({ message: "Invalid email format" }).nonempty("Email is required"),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" })
    .max(12, { message: "Password must be at most 12 characters long" })
    .nonempty("Password is required"),
  collectorPhn: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(10, { message: "Phone number must be at most 10 characters long" })
    .nonempty("Phone number is required"),
  location: z.string().nonempty("Location is required"),
  serviceAreas: z.array(z.string()).min(1, "At least one category must be selected"),
})

type CollectorSignUpFormData = z.infer<typeof CollectorSignUpSchema>

const CollectorSignUp = () => {
  const navigate = useNavigate()
  const [serviceAreaInput, setServiceAreaInput] = useState("")
  const [serviceAreas, setServiceAreas] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CollectorSignUpFormData>({
    resolver: zodResolver(CollectorSignUpSchema),
  })

  const handleAddServiceArea = () => {
    if (serviceAreaInput.trim() && !serviceAreas.includes(serviceAreaInput.trim())) {
      const updatedServiceAreas = [...serviceAreas, serviceAreaInput.trim()]
      setServiceAreas(updatedServiceAreas)
      setValue("serviceAreas", updatedServiceAreas)
      setServiceAreaInput("")
    }
  }

  const handleDeleteServiceArea = (area: string) => {
    const updatedServiceAreas = serviceAreas.filter((service) => service !== area)
    setServiceAreas(updatedServiceAreas)
    setValue("serviceAreas", updatedServiceAreas)
  }

  const onSubmit = async (data: CollectorSignUpFormData) => {
    console.log("from frontend ", data)
    try {
      await axios.post("http://localhost:8068/collector/sign-up", data)
      console.log(data)
      navigate("/collector/sign-in")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex  justify-center items-center min-h-screen bg-gray-800 p-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full  rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8">
          <CardHeader className="mb-6">
            <h1 className="text-4xl font-bold text-center text-white">Register Now</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8 ">
              <div className=" flex flex-row md:grid md:grid-cols-2 gap-4">
                <InputField
                  icon={<Mail className="text-green-300" />}
                  type="text"
                  placeholder="Enter your email"
                  register={register("collectorEmail")}
                  error={errors.collectorEmail}
                  label="Email"
                />
                <InputField
                  icon={<User className="text-green-300" />}
                  type="text"
                  placeholder="Choose a username"
                  register={register("collectorName")}
                  error={errors.collectorName}
                  label="Username"
                />
                <InputField
                  icon={<Smartphone className="text-green-300" />}
                  type="text"
                  placeholder="Enter your phone number"
                  register={register("collectorPhn")}
                  error={errors.collectorPhn}
                  label="Phone Number"
                />
                <InputField
                  icon={<MapPinHouse className="text-green-300" />}
                  type="text"
                  placeholder="Enter your location"
                  register={register("location")}
                  error={errors.location}
                  label="Location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceArea" className="text-white">
                  Service Areas
                </Label>
                <div className="relative">
                  <LandPlot className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300" />
                  <Input
                    id="serviceArea"
                    type="text"
                    value={serviceAreaInput}
                    onChange={(e) => setServiceAreaInput(e.target.value)}
                    className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
                    placeholder="Enter a service area"
                  />
                  <Button
                    type="button"
                    onClick={handleAddServiceArea}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                  >
                    Add
                  </Button>
                </div>
                {errors.serviceAreas && <p className="text-sm text-red-500 mt-1">{errors.serviceAreas.message}</p>}
                <ScrollArea className="h-[100px] bg-white/10 rounded-lg p-2">
                  <ul className="space-y-2">
                    {serviceAreas.map((area, index) => (
                      <motion.li
                        key={index}
                        className="flex justify-between items-center bg-white/20 p-2 rounded-md"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white">{area}</span>
                        <Button
                          type="button"
                          onClick={() => handleDeleteServiceArea(area)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          Remove
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
              <InputField
                icon={<Lock className="text-green-300" />}
                type="password"
                placeholder="Create a password"
                register={register("password")}
                error={errors.password}
                label="Password"
              />
              <Button className="w-full text-xl py-6 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                Get Started
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-lg text-gray-200">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/collector/sign-in")}
                className="text-white font-semibold underline hover:text-green-200 transition-colors duration-300 cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

interface InputFieldProps {
  icon: React.ReactNode
  type: string
  placeholder: string
  register: any
  error?: { message?: string }
  label: string
}

const InputField: React.FC<InputFieldProps> = ({ icon, type, placeholder, register, error, label }) => (
  <div className="space-y-2">
    <Label htmlFor={label} className="text-white">
      {label}
    </Label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
      <Input
        id={label}
        className="pl-10 w-full text-lg text-white bg-white/20 border-0 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  </div>
)

export default CollectorSignUp

