import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Recycle, Truck, Users, DollarSign, Leaf, User } from "lucide-react"
import { useNavigate } from "react-router-dom"


const AboutPage: React.FC = () => {

    const user = localStorage.getItem('user') 
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-400">About Kabadi Kart</h1>
          {
            user ? 
            <User 
                onClick={() => navigate('/profile')}
                className=" h-8 w-8 text-green-400 cursor-pointer" 
            /> : null
          }

        </div>
      </header>
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-6">
              Kabadi Kart is a revolutionary web application designed to transform the way we handle recyclable waste.
              Our mission is to create a seamless digital marketplace that connects buyers and sellers of recyclable
              materials, promoting sustainability and environmental consciousness in urban areas.
            </p>
            <Button 
              onClick={() => navigate('/sign-up')} className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold">
              Join Kabadi Kart Today
            </Button>
          </div>
          <div className="relative h-64 md:h-auto">
            <img
              src="https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs12132-023-09493-z/MediaObjects/12132_2023_9493_Fig3_HTML.png"
              alt="Recycling illustration"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-12 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <Recycle className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-300">List Your Recyclables</h3>
              <p className="text-gray-300">
                Easily list your recyclable items on our platform, specifying details and pricing.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-300">Connect with Buyers</h3>
              <p className="text-gray-300">Our platform matches you with interested buyers in your area.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <Truck className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-300">Schedule Pickup</h3>
              <p className="text-gray-300">Arrange convenient pickup times for a smooth transaction process.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold text-green-400 mt-12 mb-6">Benefits of Kabadi Kart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 flex items-start">
              <DollarSign className="w-8 h-8 text-green-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">Earn from Waste</h3>
                <p className="text-gray-300">
                  Turn your recyclable waste into a source of income. Kabadi Kart provides a platform to monetize
                  materials that would otherwise be discarded.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 flex items-start">
              <Leaf className="w-8 h-8 text-green-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-300">Promote Sustainability</h3>
                <p className="text-gray-300">
                  By facilitating the recycling process, Kabadi Kart helps reduce waste and promotes a more sustainable
                  urban environment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Join the Recycling Revolution</h2>
          <p className="text-lg text-gray-300 mb-6">
            Whether you're looking to declutter your space, earn extra income, or contribute to a greener planet, Kabadi
            Kart is your go-to platform for all things recyclable.
          </p>
          <Button 
          onClick={() => navigate('/sign-in')}
          className="bg-green-500 hover:bg-green-600 text-gray-900 text-lg px-8 py-3 font-semibold">
            Get Started with Kabadi Kart
          </Button>
        </div>
      </main>
    </div>
  )
}

export default AboutPage

