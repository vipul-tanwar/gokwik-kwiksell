import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

export function KwikEngageHeader() {
  return (
    <header className="w-full bg-white border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/placeholder.svg?height=40&width=150" alt="KwikEngage Logo" className="h-10" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700">Welcome, Gokwik User</div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  )
}
