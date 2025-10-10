import { DataTable } from "@/components/layout/data-table";

import { createFileRoute } from '@tanstack/react-router';

import { ChartAreaInteractive } from "@/components/layout/chart-area-interactive";

import { SectionCards } from '@/components/section-cards'; 

import datas from '@/routes/data.json';

import { userQueryOptions } from '@/lib/api';
import { useQuery } from "@tanstack/react-query";




export const Route = createFileRoute('/dashboard')({
  component: Index,
});



function Index() {

  const { isPending, data, error } = useQuery(userQueryOptions);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  console.log("Current user:", data);


  return (
 
  <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <h1></h1>
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
        <DataTable data={datas} />
      </div>
    </div>
  </div>
  );
}

