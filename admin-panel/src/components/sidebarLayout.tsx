import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./appSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { breadcrumbConfig } from "@/constants/breadcrumbConfig";
import { AppBreadcrumb } from "./appBreadcrumb";
import { Separator } from "./ui/separator";

function SidebarLayout() {
  const location = useLocation();
  const breadcrumbs = breadcrumbConfig[location.pathname] || [];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb routes={breadcrumbs} />
          </div>
        </header>
        <main className="gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default SidebarLayout;
