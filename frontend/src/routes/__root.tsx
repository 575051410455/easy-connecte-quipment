
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AppSidebar } from "@/components/app-sidebar"

import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { useAuth } from "@/lib/auth";


export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {

  const { logout, isAuthenticated, user } = useAuth();

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
          <header className=' h-16 shrink-0 gap-2 px-4'>
            <SiteHeader data={user} onLogout={logout}  />
          </header>
          <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}