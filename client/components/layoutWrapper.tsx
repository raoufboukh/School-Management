"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar/AppSidebar";
import Navbar from "./Navbar/Navbar";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="px-3 flex items-center gap-4 shadow-sm border-b border-gray-200">
            <SidebarTrigger />
            <Navbar />
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </Provider>
  );
};

export default LayoutWrapper;
