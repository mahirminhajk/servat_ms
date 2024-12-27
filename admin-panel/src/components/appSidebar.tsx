import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  LucideLayoutDashboard,
  ChevronUp,
  User2,
  Store,
  CalendarCheck2,
  Drill,
  UserSearch,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppSelector } from "@/hooks/storeHooks";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD,
    icon: LucideLayoutDashboard,
  },
  {
    title: "Services",
    url: ROUTES.SERVICES,
    icon: Drill,
  },
  {
    title: "Customers",
    url: ROUTES.CUSTOMERS,
    icon: UserSearch,
  },
  {
    title: "Booking",
    url: ROUTES.BOOKING,
    icon: CalendarCheck2,
  },
  {
    title: "Settings",
    url: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export function AppSidebar() {
  const userState = useAppSelector((state) => state.user);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-400 text-sidebar-primary-foreground">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SERVAT</span>
                  <span className="">Business</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarImage
                      src={
                        userState.profile
                          ? userState.profile
                          : "https://github.com/shadcn.png"
                      }
                      alt="profile-picture"
                    />
                    <AvatarFallback>
                      <User2 />
                    </AvatarFallback>
                  </Avatar>{" "}
                  <span className="capitalize">{userState?.name || "NAN"}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

//TODO: LOGOUT
//TODO: DASH ITEMS
