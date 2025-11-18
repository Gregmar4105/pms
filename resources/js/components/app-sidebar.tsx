import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, Users, UserCog, Album , 
    ShieldUser, LayoutDashboard, UserRoundCheck, ArrowRightFromLine } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Booked Flights',
        href: '/booked-flights',
        icon: Album ,
    },
    {
        title: 'Checked-IN',
        href: '/checked-in',
        icon: UserRoundCheck ,
    },
    {
        title: 'Boarding',
        href: '/boarding',
        icon: ArrowRightFromLine ,
    },
];

const NextNavItems: NavItem[] = [
    {
        title: 'Permissions',
        href: '/permissions',
        icon: ShieldUser ,
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: UserCog,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroupLabel>General</SidebarGroupLabel>
                <NavMain items={mainNavItems} />
            </SidebarContent>
            
            <SidebarContent className="flex-2">
                <SidebarGroupLabel>System Administration</SidebarGroupLabel>
                <NavMain items={NextNavItems}>
                    </NavMain>
            </SidebarContent>

            <SidebarFooter >
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
