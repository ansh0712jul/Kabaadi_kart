import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header buttonText="Home" navigateTo="/" />
      <main className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <Input id="name" className="mt-1 bg-gray-700 text-white" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Input id="email" type="email" className="mt-1 bg-gray-700 text-white" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea id="message" className="mt-1 bg-gray-700 text-white w-full" rows={4} required />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-gray-900">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-green-400" />
                <span className="text-white">contact@kabadikart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-green-400" />
                <span className="text-white">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-green-400" />
                <span className="text-white">123 Recycle Street, Green City, EC 12345</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How do I schedule a pickup?",
                a: "You can schedule a pickup through our app or website by selecting 'Request Pickup' and choosing a convenient time slot.",
              },
              {
                q: "What items do you accept?",
                a: "We accept a wide range of recyclable materials including paper, cardboard, plastics, metals, and electronics. Check our guidelines for a full list.",
              },
              {
                q: "How are prices determined?",
                a: "Prices are determined based on the current market rates for recyclable materials and may vary depending on quality and quantity.",
              },
              {
                q: "Is my data secure?",
                a: "Yes, we use industry-standard encryption and security measures to protect your personal and transaction data.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage

