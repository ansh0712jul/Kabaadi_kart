// components/Header.tsx
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function Header() {
  return (
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
  )
}
