
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

import { LogOut, User, Calendar, Package } from "lucide-react"
import RequestDetails from "./RequestDetails"
import Footer from "@/components/ui/Footer"

// Mock data (replace with actual data fetching in a real application)
const collectorInfo = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  address: "123 Collector St, City, Country",
}

const upcomingRequests = [
  { id: 1, client: "Alice", date: "2023-06-15", items: "Paper, Plastic" },
  { id: 2, client: "Bob", date: "2023-06-16", items: "Electronics, Metal" },
  { id: 3, client: "Charlie", date: "2023-06-17", items: "Glass, Cardboard" },
]

const acceptedRequests = [
  { id: 4, client: "David", date: "2023-06-14", items: "Paper, Plastic", status: "In Progress" },
  { id: 5, client: "Eve", date: "2023-06-13", items: "Metal", status: "Completed" },
  { id: 6, client: "Frank", date: "2023-06-12", items: "Electronics", status: "In Progress" },
]

type Request = {
  id: number
  client: string
  date: string
  items: string
  status?: string
}

export default function CollectorDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-green-400">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/75 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">Kabadikart</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-green-400" href="/">
                Home
              </a>
              <a className="transition-colors hover:text-green-400" href="/services">
                Prices
              </a>
              <a className="transition-colors hover:text-green-400" href="/contact">
                Contact
              </a>
            </nav>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-400">Collector Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Collector Information */}
          <Card className="col-span-full lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <User className="mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-green-400">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={collectorInfo.name}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-green-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={collectorInfo.email}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-green-400">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={collectorInfo.phone}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-green-400">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={collectorInfo.address}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Requests */}
          <Card className="col-span-full lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Calendar className="mr-2" />
                Upcoming Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-4">
                  {upcomingRequests.map((request) => (
                    <li
                      key={request.id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleRequestClick(request)}
                    >
                      <div>
                        <p className="font-semibold text-green-400">{request.client}</p>
                        <p className="text-sm text-gray-400">{request.date}</p>
                        <p className="text-sm text-gray-300">{request.items}</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        View
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Accepted Requests */}
          <Card className="col-span-full lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Package className="mr-2" />
                Accepted Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-4">
                  {acceptedRequests.map((request) => (
                    <li
                      key={request.id}
                      className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleRequestClick(request)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-green-400">{request.client}</p>
                          <p className="text-sm text-gray-400">{request.date}</p>
                          <p className="text-sm text-gray-300">{request.items}</p>
                          <p className="text-sm font-medium mt-1 text-green-500">Status: {request.status}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                        >
                          View
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        {selectedRequest && <RequestDetails request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
      </main>

      <Footer />
    </div>
  )
}

