import { MainLayout } from "@/components/layout/main-layout";
import { ContentManager } from "@/components/content/content-manager";

export default function ContenidoPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <ContentManager />
      </div>
    </MainLayout>
  );
} 