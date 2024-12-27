import {
  BarChart2,
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";

// Sidebar items data
export const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
  {
    name: "Properties",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/overview",
  },
  { name: "Tenants", icon: Users, color: "#EC4899", href: "/tenants" },
  {
    name: "Maintenance",
    icon: DollarSign,
    color: "#10B981",
    href: "/maintenance",
  },
  {
    name: "PaymentHistory",
    icon: ShoppingCart,
    color: "#F59E0B",
    href: "/payments",
  },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];
