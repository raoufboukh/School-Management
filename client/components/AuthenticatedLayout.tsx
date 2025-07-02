"use client";
import { RootState, AppDispatch } from "@/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar/AppSidebar";
import Navbar from "./Navbar/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAuth } from "@/redux/slices/AuthSlice";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isChecking } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();
  const isLoginPage = path === "/login" || path === "/register";
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isChecking) {
      if (user && isLoginPage) {
        router.push("/");
      }
      if (!user && !isLoginPage) {
        router.push("/login");
      }
    }
  }, [user, isLoginPage, router, isChecking]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <main>{children}</main>;
  }

  return (
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
  );
};

export default AuthenticatedLayout;
