import {
  Banknote,
  BanknoteArrowUp,
  HandHelping,
  Home,
  User,
  UserRound,
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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
  {
    title: "Mothers",
    url: "/mothers",
    icon: UserRound,
  },
  {
    title: "Subscriptions",
    url: "/subscriptions",
    icon: BanknoteArrowUp,
  },
  {
    title: "Donations",
    url: "/donations",
    icon: HandHelping,
  },
  {
    title: "Pricing",
    url: "/pricing",
    icon: Banknote,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[80px] mb-5 flex items-center gap-2">
            <Image
              src="/doa-transparent.png"
              alt="Doa Ibu"
              width={80}
              height={80}
            />
            <div>
              <h3 className="text-2xl font-bold">Doa Ibu</h3>
              <p>Admin Panel</p>
            </div>
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
