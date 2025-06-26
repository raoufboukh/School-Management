import { Calendar, Home, Inbox, Settings, User } from "lucide-react";

export const items = [
  {
    title: "Home",
    link: "/",
    icon: Home,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Students",
    link: "/students",
    icon: User,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Teachers",
    link: "/teachers",
    icon: User,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Attendance",
    link: "/attendance",
    icon: Calendar,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Inbox",
    link: "/inbox",
    icon: Inbox,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Calendar",
    link: "/calendar",
    icon: Calendar,
    role: ["student", "admin", "teacher"],
  },
  {
    title: "Settings",
    link: "/settings",
    icon: Settings,
    role: ["student", "admin", "teacher"],
  },
];
