import { AppSidebar } from "@/components/shared/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Admin Pannel | Spice Lounge",
};

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "12rem",
        "--sidebar-width-mobile": "12rem",
      }}
    >
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
