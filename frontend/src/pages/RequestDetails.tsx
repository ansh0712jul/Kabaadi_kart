import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Request = {
  id: number
  client: string
  date: string
  items: string
  status?: string
}

type RequestDetailsProps = {
  request: Request
  onClose: () => void
}

export default function RequestDetails({ request, onClose }: RequestDetailsProps) {
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
            <span className="col-span-3">{request.client}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium col-span-1">Date:</span>
            <span className="col-span-3">{request.date}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium col-span-1">Items:</span>
            <span className="col-span-3">{request.items}</span>
          </div>
          {request.status && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right font-medium col-span-1">Status:</span>
              <span className="col-span-3">{request.status}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

