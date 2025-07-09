import { MainLayout } from "@/components/layout/main-layout";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <DashboardOverview />
      </div>
    </MainLayout>
  );
} 
