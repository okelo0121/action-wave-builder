import { LayoutDashboard, CircleDot, Wallet, ArrowLeftRight, Settings, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Savings Circles", url: "/dashboard", icon: CircleDot },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
];

const secondaryNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="border-r border-white/10 bg-background/95 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-24 w-24">
            <img src="/actionlogo.png" alt="Action Wave" className="w-full h-full object-contain" />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground/70 uppercase tracking-widest font-semibold px-2 mb-2">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10 hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary transition-all duration-200">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 w-full rounded-md"
                      activeClassName="bg-primary/10 text-primary border-r-2 border-primary rounded-r-none"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs text-muted-foreground/70 uppercase tracking-widest font-semibold px-2 mb-2">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10 hover:bg-white/5 transition-all duration-200">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 w-full rounded-md text-muted-foreground hover:text-white"
                      activeClassName="text-white bg-white/5"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">User Account</p>
            <p className="text-xs text-muted-foreground truncate">0x1234...5678</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
