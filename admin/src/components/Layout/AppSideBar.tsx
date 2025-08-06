import {
  Banknote,
  BanknoteArrowUp,
  HandHelping,
  Home,
  Users,
} from "lucide-react";

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
import Image from "next/image";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/secure_admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/secure_admin/users",
    icon: Users,
  },
  {
    title: "Subscriptions",
    url: "/secure_admin/subscriptions",
    icon: BanknoteArrowUp,
  },
  {
    title: "Donations",
    url: "/secure_admin/donations",
    icon: HandHelping,
  },
  {
    title: "Pricing",
    url: "/secure_admin/pricing",
    icon: Banknote,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  if (pathName.includes("/login")) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[70px] mb-5 flex flex-col items-start gap-2">
            <Image
              src="/doaibu-logo-transparent.png"
              alt="Doa Ibu"
              width={140}
              height={80}
            />
          </SidebarGroupLabel>
          <Separator />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
