import  { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import Footer from "@/components/ui/Footer"


// Mock data for the dashboard
const collectorInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  address: "123 Collector St, City, Country",
}

const upcomingRequests = [
  { id: 1, client: "Alice", date: "2025-01-25", items: "Electronics", location: "456 Tech Ave, Digital City" },
  { id: 2, client: "Bob", date: "2025-01-26", items: "Furniture", location: "789 Comfort Lane, Cozy Town" },
  { id: 3, client: "Charlie", date: "2025-01-27", items: "Clothing", location: "101 Fashion Blvd, Trendy Village" },
]

const acceptedRequests = [
  {
    id: 4,
    client: "David",
    date: "2025-01-23",
    items: "Books",
    status: "In Progress",
    location: "202 Library St, Bookworm City",
  },
  {
    id: 5,
    client: "Eve",
    date: "2025-01-22",
    items: "Kitchenware",
    status: "Completed",
    location: "303 Culinary Road, Gourmet Town",
  },
]

type Request = {
  id: number
  client: string
  date: string
  items: string
  status?: string
  location: string
}

function RequestDetails({ request, onClose }: { request: Request; onClose: () => void }) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Request Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Client:</strong> {request.client}
          </p>
          <p>
            <strong>Date:</strong> {request.date}
          </p>
          <p>
            <strong>Items:</strong> {request.items}
          </p>
          <p>
            <strong>Location:</strong> {request.location}
          </p>
          {request.status && (
            <p>
              <strong>Status:</strong> {request.status}
            </p>
          )}
        </div>
        <div className="mt-4 space-x-2">
          {!request.status && <Button size="sm">Accept</Button>}
          {request.status && (
            <>
              <Button size="lg" variant="outline" className="bg-green-700 hover:text-green-600">
                Complete
              </Button>
              <Button size="lg" variant="outline" className="bg-green-700 hover:text-green-600">
                Cancel
              </Button>
            </>
          )}
          <Button size="lg" variant="secondary" className="bg-green-700 hover:text-green-600" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CollectorDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white">
            Kabadikart
          </a>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/services" className="text-gray-300 hover:text-white transition-colors">Prices</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <Button 
              variant="outline"
              className="text-black border-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 mt-16 text-green-500">Collector Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Collector Information */}
          <Card className="col-span-full lg:col-span-1 bg-gray-800  ">
            <CardHeader>
              <CardTitle className="text-green-700">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-green-700">Name</Label>
                  <Input className="bg-gray-600" id="name" value={collectorInfo.name} readOnly />
                </div>
                <div>
                  <Label htmlFor="email" className="text-green-700">Email</Label>
                  <Input id="email" className="bg-gray-600"  value={collectorInfo.email} readOnly />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-green-700">Phone</Label>
                  <Input id="phone" className="bg-gray-600"  value={collectorInfo.phone} readOnly />
                </div>
                <div>
                  <Label htmlFor="address" className="text-green-700">Address</Label>
                  <Input id="address" className="bg-gray-600"  value={collectorInfo.address} readOnly />
                </div>
                <Button className="w-full bg-green-600">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Requests */}
          <Card className="col-span-full lg:col-span-1 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-green-700">Upcoming Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingRequests.map((request) => (
                  <li
                    key={request.id}
                    className="flex items-center justify-between p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleRequestClick(request)}
                  >
                    <div>
                      <p className="font-semibold">{request.client}</p>
                      <p className="text-sm text-gray-600">{request.date}</p>
                      <p className="text-sm">{request.items}</p>
                    </div>
                    <Button size="lg" className=" bg-green-600 hover:bg-green-600">View</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Accepted Requests */}
          <Card className="col-span-full lg:col-span-1 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-green-700">Accepted Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {acceptedRequests.map((request) => (
                  <li
                    key={request.id}
                    className="p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleRequestClick(request)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{request.client}</p>
                        <p className="text-sm text-gray-600">{request.date}</p>
                        <p className="text-sm">{request.items}</p>
                        <p className="text-sm font-medium mt-1">Status: {request.status}</p>
                      </div>
                      <Button size="lg" variant="outline" className="bg-green-600 hover:bg-green-600">
                        View
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Request Details */}
        {
          selectedRequest && 
            <RequestDetails 
              request={selectedRequest} 
              onClose={() => setSelectedRequest(null)} 
            />
        }
      </main>

      <Footer />
    </div>
  )
}

