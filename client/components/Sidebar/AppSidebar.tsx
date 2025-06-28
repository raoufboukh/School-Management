"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MdSchool } from "react-icons/md";
import { items } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 pt-5">
            <span className="p-2 bg-primary rounded-lg">
              <MdSchool className="text-2xl text-secondary" />
            </span>
            <span className="text-lg font-semibold">EduManage</span>
          </div>
          <SidebarGroupLabel className="mt-8 mb-2 text-base font-semibold">
            <p>Menu</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.link}
                      className={`flex items-center gap-2 transition-all duration-300 ${
                        (
                          item.link === "/"
                            ? path === "/"
                            : path.startsWith(item.link)
                        )
                          ? "bg-accent/80"
                          : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
