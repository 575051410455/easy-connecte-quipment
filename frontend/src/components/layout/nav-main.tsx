"use client"

import { IconDashboard, type Icon } from "@tabler/icons-react"
import { useMatchRoute } from "@tanstack/react-router"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {

 const matchRoute = useMatchRoute()


  return (
 <SidebarGroup>
     
      <SidebarMenu>
        {items.map((item) => {
          const isActive = matchRoute({ to: item.url, fuzzy: true })
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                isActive={!!isActive}
                tooltip={item.title}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
