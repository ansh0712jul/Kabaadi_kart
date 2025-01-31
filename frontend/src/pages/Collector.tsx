
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { LogOut, User, Calendar, Package } from "lucide-react"
import RequestDetails from "./RequestDetails"
import Footer from "@/components/ui/Footer"
import { useNavigate } from "react-router-dom"

export interface IServiceArea {
  city: string;
  _id: string;
}

export interface ICollector {
  _id: string;
  collectorName: string;
  collectorEmail: string;
  collectorPhn: string;
  location: string;
  serviceAreas: IServiceArea[];
}

export interface IPickRequest{
  _id:string,
  email:string,
  img:string,
  name:string,
  phone:string,
  category:string[],
  pickUpDate:string,
  pickUpTime:string,
  sellOrDonate : 'Sell' | 'Donate',
  status : 'Pending' | 'Approved' | 'Completed' | 'Cancelled',
}

export default function CollectorDashboard() {
  const [selectedRequest, setSelectedRequest] = useState<IPickRequest | null >()
  const [collector, setCollector] = useState<ICollector>({} as ICollector)
  const [pickRequests, setPickRequests] = useState<IPickRequest[]>([])
  const [acceptedRequests, setAcceptedRequests] = useState<IPickRequest[]>([])

  const navigate = useNavigate();
  
  const handleRequestClick = (request: IPickRequest) => {
    setSelectedRequest(request)
  }

  const logout = async () => {
    try {
        const token = localStorage.getItem('accessToken')

        await axios.post('http://localhost:8068/collector/logout',{},{
          headers :{
            'Authorization': `Bearer ${token}`
          }
        })

        localStorage.removeItem('accessToken');
        localStorage.removeItem('collector');
        
        navigate("/collector/sign-in")

    } catch (error) {
        console.error("Logout error:", error);
    }
};

  useEffect(() => {
    const collector = localStorage.getItem('collector');
    const parsedcollector = collector? JSON.parse(collector) : null;
    const email = parsedcollector?.email
  
    const token = localStorage.getItem('accessToken')
    
     axios.get('http://localhost:8068/collector/get-collector', {
      headers:{
        'Authorization': `Bearer ${token}`
      },
      params: {collectorEmail: email}
    }).then((response) => {
      setCollector(response.data.data)
     
    }).catch((error) => {
      console.log(error);
    })
  },[])

  useEffect(() => {

    const token = localStorage.getItem('accessToken')
    axios.get('http://localhost:8068/request/collector/get-pickup-request', {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setPickRequests(response.data.data)
      console.log("all request",pickRequests);
    }).then((error) => {
      console.log(error);
    })
    
  },[])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    axios.get('http://localhost:8068/collector/collector-acceptRequest',{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setAcceptedRequests(response.data.data);
      console.log("accepted request",acceptedRequests);
    }).catch((error) => {
      console.log(error);
    })
  },[])


  // get accepted or completed pickup rrequest 

  useEffect(() => {
    axios.get('http://localhost:8068/request/pickup-request/get-accepted-or-completed')
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
      
    })
    
  })

  

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
          <Button 
          onClick={logout}
          variant="outline" size="sm" className="ml-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-green-400">Collector Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Collector Information */}
          
          {
            collector && (
              
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
                    readOnly
                    value={collector.collectorName}
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-green-400">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={collector.collectorEmail}
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
                    value={collector.collectorPhn}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-green-400">
                    Location
                  </Label>
                  <Input
                    id="address"
                    value={collector.location}
                    readOnly
                    className="bg-gray-800 border-gray-700 text-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceAreas" className="text-green-400">
                    Service Areas
                  </Label>
                  <ul className="text-green-400 px-2 py-4 min-h-[100px] w-full max-h-[240px]   md:grid md:grid-cols-4 rounded ">
                    { collector.serviceAreas && collector.serviceAreas.map((area) => (
                      <li className="p-2 w-fit h-8 flex items-center justify-center bg-gray-800 gap-3 rounded" key={area._id}>{area.city}</li>
                    ))
                    }
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
              )
          }

          {/* Upcoming Requests */}
          <Card className="col-span-full lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Calendar className="mr-2" />
                Upcoming Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <ul className="space-y-4">
                  { pickRequests && pickRequests.map((request ) => (
                    <li
                      key={request._id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      onClick={() => handleRequestClick(request )}
                    >
                      <div>
                        <p className="font-semibold text-green-400">{request.name}</p>
                        <p className="text-sm text-gray-400">{request.pickUpDate}</p>
                        <p className="text-sm text-gray-300">{request.pickUpTime}</p>
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
              <ScrollArea className="h-[500px] pr-4">
                <ul className="space-y-4">
                  {acceptedRequests && acceptedRequests.map((request) => (
                    <li
                      key={request._id}
                      className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                      // onClick={() => handleRequestClick(request)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-green-400">{request.name}</p>
                          <p className="text-sm text-gray-400">{request.pickUpDate}</p>
                          <p className="text-sm text-gray-300">{request.pickUpTime}</p>
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
        {selectedRequest && <RequestDetails request={selectedRequest} onClose={() => setSelectedRequest(null) } />}
      </main>

      <Footer />
    </div>
  )
}

