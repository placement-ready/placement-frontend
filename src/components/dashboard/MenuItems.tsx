import {
  Eye,
  LayoutDashboard,
  Sparkles,
  FileText,
  Archive,
  Mic2,
  BarChart3,
  Target,
  TrendingUp,
  Settings,
  Zap,
  FileEdit,
} from 'lucide-react';
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
      id: 'main',
      name: 'Main',
      icon: <LayoutDashboard />,
      type: 'heading',
      children: [
        {
          id: 'overview',
          name: 'Dashboard',
          icon: <Eye />,
          href: '/dashboard',
          type: 'link',
        },
        {
          id: 'quick-actions',
          name: 'Quick Actions',
          icon: <Zap />,
          href: '/dashboard/quick-actions',
          type: 'link',
        },
      ],
    },
    {
      id: 'interview',
      name: 'Interview',
      icon: <Mic2 />,
      type: 'heading',
      children: [
        {
          id: 'new-interview',
          name: 'New Interview',
          icon: <Sparkles />,
          href: '/dashboard/interview/new',
          type: 'link',
        },
        {
          id: 'interview-results',
          name: 'Past Results',
          icon: <Archive />,
          href: '/dashboard/interview/result',
          type: 'link',
        },
        {
          id: 'practice-questions',
          name: 'Practice Mode',
          icon: <FileText />,
          href: '/dashboard/interview/prepare',
          type: 'link',
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 />,
      type: 'heading',
      children: [
        {
          id: 'skill-progress',
          name: 'Skill Progress',
          icon: <TrendingUp />,
          href: '/dashboard/skill-progress',
          type: 'link',
        },
        {
          id: 'goal-tracking',
          name: 'Goal Tracking',
          icon: <Target />,
          href: '/dashboard/goal-tracking',
          type: 'link',
        },
      ],
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: <FileEdit />,
      type: 'heading',
      children: [
        {
          id: 'resume-builder',
          name: 'Resume Builder',
          icon: <FileEdit />,
          href: '/dashboard/resume-builder',
          type: 'link',
        },
        {
          id: 'settings',
          name: 'Settings',
          icon: <Settings />,
          href: '/dashboard/settings',
          type: 'link',
        },
      ],
    },
  ],
};

export default menuItems;
