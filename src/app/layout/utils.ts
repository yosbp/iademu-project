import { MonitorDot, FileText, Users } from "lucide-vue-next";
import { MenuItemType } from "@/app/layout/types";

export const menuItems: MenuItemType[] = [
  { isHeader: true, title: "menu" },
  //Dashboard
  {
    icon: MonitorDot,
    title: "dashboard",
    path: "/",
  },
  { isHeader: true, title: "orders" },
  {
    icon: FileText,
    title: "orders",
    path: "/orders",
  },
  { isHeader: true, title: "providers" },
  {
    icon: Users,
    title: "providers",
    path: "/providers",
  },
];
