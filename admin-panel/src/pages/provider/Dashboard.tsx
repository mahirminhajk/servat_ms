import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <h1>Dashboard</h1>
      </main>
    </SidebarProvider>
  );
}

export default Dashboard;
