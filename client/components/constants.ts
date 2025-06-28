import { Calendar, Home, Inbox, Settings, User } from "lucide-react";
import {
  MdBarChart,
  MdCalendarToday,
  MdEventNote,
  MdGroup,
  MdPayment,
  MdPerson,
} from "react-icons/md";

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

export const subjects = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
  "Economics",
  "Psychology",
  "Sociology",
];

export const tablePayment = [
  "Subject",
  "Teacher",
  "Amount",
  "Sessions",
  " Remaining",
  "Attendance",
  "Date",
  "Status",
];

export const linksStudent = [
  { id: "overview", label: "Overview", icon: MdPerson },
  { id: "payments", label: "Payments", icon: MdPayment },
  { id: "attendance", label: "Attendance", icon: MdEventNote },
  { id: "analytics", label: "Analytics", icon: MdBarChart },
];

export const linksTeacher = [
  { id: "overview", label: "Overview", icon: MdPerson },
  { id: "students", label: "Students", icon: MdGroup },
  { id: "schedule", label: "Schedule", icon: MdCalendarToday },
  { id: "performance", label: "Performance", icon: MdBarChart },
];
