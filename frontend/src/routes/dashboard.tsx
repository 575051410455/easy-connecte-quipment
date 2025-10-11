import { DataTable } from "@/components/layout/data-table";

import { createFileRoute, Navigate } from '@tanstack/react-router';

import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive";

import { SectionCards } from '@/components/section-cards'; 

import data from '@/routes/data.json';

import { useAuth } from "@/lib/auth";




export const Route = createFileRoute('/dashboard')({
  component: Index,
});



function Index() {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  return (
  <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={data} />
      </div>
    </div>
  </div>
  );
}

