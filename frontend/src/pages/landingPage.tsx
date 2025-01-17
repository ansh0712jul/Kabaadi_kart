import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Menu} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 ">
      <header className="container  mx-auto px-4 py-6 flex justify-between items-center ">
        <div className="flex items-center space-x-2">
          <img src="https://media.istockphoto.com/id/1239766319/vector/handshake-black-icon.jpg?s=612x612&w=0&k=20&c=0iM61tvTONbfHthKeugWoxJSbykgsUC5BN5E3QYGpCk=" alt="Logo" width={40} height={40} className="rounded-full" />
          <span className="text-2xl font-bold text-blue-600">Kabadikart</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-xl">
          <a href="#features" className="text-gray-400 hover:text-blue-600 transition-colors">Features</a>
          <a href="#testimonials" className="text-gray-400 hover:text-blue-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-gray-400 hover:text-blue-600 transition-colors">Pricing</a>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 bg-white" />
        </Button>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center ">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Revolutionize Your Workflow
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Boost productivity and streamline your processes with our cutting-edge platform. Experience the future of work today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </section>

        <section id="features" className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Intuitive Dashboard",
                "Real-time Collaboration",
                "Advanced Analytics",
                "Customizable Workflows",
                "Secure Data Encryption",
                "24/7 Customer Support"
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">What Our Customers Say</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  quote: "This platform has completely transformed how we operate. It's intuitive, powerful, and has saved us countless hours.",
                  author: "Jane Doe, CEO of TechCorp"
                },
                {
                  quote: "The customer support is unparalleled. Any time we've had a question, the team has been incredibly responsive and helpful.",
                  author: "John Smith, Founder of StartupX"
                },
                {
                    quote: "This platform has completely transformed how we operate. It's intuitive, powerful, and has saved us countless hours.",
                    author: "Jane Doe, CEO of TechCorp"
                  },
                  {
                    quote: "The customer support is unparalleled. Any time we've had a question, the team has been incredibly responsive and helpful.",
                    author: "John Smith, Founder of StartupX"
                  }
              ].map((testimonial, index) => (
                <blockquote key={index} className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:cursor-pointer hover:-translate-y-4 transition-all">
                  <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                  <footer className="text-gray-900 font-medium">{testimonial.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 ">
              {[
                { name: "Basic", price: "$29", features: ["5 Users", "Basic Features", "Email Support"] },
                { name: "Pro", price: "$79", features: ["Unlimited Users", "Advanced Features", "24/7 Phone Support"] },
                { name: "Enterprise", price: "Custom", features: ["Tailored Solutions", "Dedicated Account Manager", "On-site Training"] }
              ].map((plan, index) => (
                <div key={index} className=" p-8 bg-gray-800 rounded-lg shadow-xl text-center hover:shadow-2xl hover:-translate-y-5 transition-all ">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</p>
                  <ul className="mb-8 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                    {index === 2 ? "Contact Sales" : "Choose Plan"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and transform your workflow today.
            </p>
            <form className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-auto bg-white text-gray-900 placeholder-gray-500"
              />
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 ">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">We're on a mission to revolutionize workflows and boost productivity for businesses worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-5 m-auto p-4 border w-[80%] text-xl border-gray-800 rounded-2xl text-gray-400 flex justify-center">
            <p className="">&copy; 2023 Kabadikart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

