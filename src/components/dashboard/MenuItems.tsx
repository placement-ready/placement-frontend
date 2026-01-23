import { LayoutDashboard, Sparkles, FileText, TrendingUp, Settings, History } from 'lucide-react';
import { SidebarConfig } from './Sidebar';

const menuItems: SidebarConfig = {
  logo: {
    src: '/logo.png',
    alt: 'HireMind Logo',
    title: 'HireMind',
  },
  showProfile: true,
  showLogout: true,
  menuItems: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard',
      type: 'link',
    },
    {
      id: 'new-interview',
      name: 'New Interview',
      icon: <Sparkles className="h-5 w-5" />,
      href: '/dashboard/interview/new',
      type: 'link',
    },
    {
      id: 'past-interviews',
      name: 'Past Interviews',
      icon: <History className="h-5 w-5" />,
      href: '/dashboard/interview/result',
      type: 'link',
    },
    {
      id: 'resume-builder',
      name: 'Resume Builder',
      icon: <FileText className="h-5 w-5" />,
      href: '/dashboard/resume-builder',
      type: 'link',
    },
    {
      id: 'progress',
      name: 'Progress',
      icon: <TrendingUp className="h-5 w-5" />,
      href: '/dashboard/skill-progress',
      type: 'link',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/dashboard/settings',
      type: 'link',
    },
  ],
};

export default menuItems;
