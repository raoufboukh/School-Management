import { Calendar, Home, Inbox, Settings, User } from "lucide-react";
import {
  MdBarChart,
  MdCalendarToday,
  MdEventNote,
  MdGroup,
  MdPayment,
  MdPerson,
  MdCheck,
  MdClose,
  MdSchedule,
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
    title: "Schedules",
    link: "/schedules",
    icon: MdSchedule,
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
  "math",
  "science",
  "english",
  "history",
  "geography",
  "physics",
  "chemistry",
  "biology",
  "computer Science",
  "art",
  "music",
  "physical Education",
  "economics",
  "psychology",
  "sociology",
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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

export const announcements = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    date: "November 15, 2024",
    classes: "border-l-4 border-blue-500 pl-4",
  },
  {
    id: 2,
    title: "Science Fair Registration",
    date: "November 20, 2024",
    classes: "border-l-4 border-green-500 pl-4",
  },
  {
    id: 3,
    title: "Winter Break Schedule",
    date: "December 18, 2024",
    classes: "border-l-4 border-purple-500 pl-4",
  },
];

export const quickLinks = [
  {
    label: "Student Portal",
    classes:
      "bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 px-4 rounded-lg transition-colors",
  },
  {
    label: "Teacher Portal",
    classes:
      "bg-green-100 hover:bg-green-200 text-success py-3 px-4 rounded-lg transition-colors",
  },
  {
    label: "Library",
    classes:
      "bg-purple-100 hover:bg-purple-200 text-purple-800 py-3 px-4 rounded-lg transition-colors",
  },
  {
    label: "Events",
    classes:
      "bg-orange-100 hover:bg-orange-200 text-warning py-3 px-4 rounded-lg transition-colors",
  },
];

export const fields = ["Primary", "CEM", "Licee"];

export const tableAttendance = [
  {
    title: "No.",
    icon: "",
    classes: "",
  },
  {
    title: "Name",
    icon: "",
    classes: "",
  },
  {
    title: "Level",
    icon: "",
    classes: "",
  },
  {
    title: "Present",
    icon: MdCheck,
    classes: "text-success",
  },
  {
    title: "Absent",
    icon: MdClose,
    classes: "text-error",
  },
  {
    title: "Time In",
    icon: "",
    classes: "",
  },
];

export const tableSchedules = [
  "teacher",
  "subject",
  "day",
  "time",
  "classroom",
  "students",
  "status",
  "actions",
];
