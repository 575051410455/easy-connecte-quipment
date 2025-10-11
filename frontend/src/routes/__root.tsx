
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from "@/components/app-sidebar"

import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useAuth } from "@/lib/auth";


export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {

  const { logout, isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger className='-ml-1' />
          <SiteHeader onLogout={logout}/>
        </header>
        <main>
          <Outlet />
        </main>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}