import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import axios from "axios"
import { IPickRequest } from "./Collector"
import { useState } from "react"



type RequestDetailsProps = {
  request: IPickRequest
  onClose: () => void
}



export default function RequestDetails({ request, onClose }: RequestDetailsProps) {
  const [approved , setApproved] = useState<IPickRequest[]>([])
  const acceptRequestHandler = () =>{
  const token = localStorage.getItem("accessToken")
  if(!token){
    throw new Error("No token found")
  }
  console.log(token);
  
    axios.patch(`http://localhost:8068/request/pickup-request/${request._id}/accept`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    }).then((res) => {
      
      setApproved((prev) => ([...prev , res.data.data]))
      window.location.reload();
      
      
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-green-400">
        <DialogHeader>
          <DialogTitle className="text-green-400">Request Details</DialogTitle>
          <DialogDescription className="text-gray-400">View the details of the selected request.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium col-span-1">Client:</span>
            <span className="col-span-3">{request.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium col-span-1">Date:</span>
            <span className="col-span-3">{request.pickUpDate}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium col-span-1">Items:</span>
            <span className="col-span-3">{request.category}</span>
          </div>
          {request.status && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium col-span-1">Status:</span>
              <span className="col-span-3">{request.status}</span>
            </div>
          )}
        </div>
        <DialogFooter>
        {
          approved && approved.find((item) => item._id === request._id) ? null : 
          <Button 
        onClick={() => acceptRequestHandler()}
        className="bg-green-400" type="button" variant="secondary" >
            
               Accept Request
            
          </Button>
        }
          <Button className="bg-red-400" type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

