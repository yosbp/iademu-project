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
  { isHeader: true, title: "invoices" },
  {
    icon: FileText,
    title: "invoices",
    path: "/invoices",
  },
  {
    title: "invoices",
    icon: FileText,
    subMenu: [
      { path: "/invoice/list", title: "list-view" },
      { path: "/invoice/add-new", title: "add-new" },
      { path: "/invoice/overview", title: "overview" },
    ],
  },
  { isHeader: true, title: "providers" },
  {
    icon: Users,
    title: "providers",
    path: "/providers",
  },
];
