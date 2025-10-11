
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "@/components/layout/nav-user"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"

const NewData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}


interface HeaderProps {
  onLogout: () => void;
  data: {
    name: string,
    email: string,
    avatar?: string,
  }
}


export function SiteHeader({  onLogout, data }: HeaderProps) {

  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <NavUser user={data} onLogout={onLogout}/>
        </div>
      </div>
    </header>
  )
}
