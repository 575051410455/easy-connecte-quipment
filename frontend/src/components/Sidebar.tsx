import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  CheckSquare, 
  AlertTriangle, 
  Settings,
  Building2
} from 'lucide-react';
import type { User, Screen } from '../routes/_authenticated/index';

interface SidebarProps {
  currentUser: User;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Sidebar({ currentUser, currentScreen, onNavigate }: SidebarProps) {
  const menuItems = [
    ...(currentUser.role === 'manager' ? [{
      id: 'dashboard' as Screen,
      label: 'ภาพรวม',
      icon: LayoutDashboard,
    }] : []),
    {
      id: 'tasks' as Screen,
      label: currentUser.role === 'manager' ? 'รายการงานทั้งหมด' : 'งานของฉัน',
      icon: CheckSquare,
    },
    {
      id: 'report-issue' as Screen,
      label: 'แจ้งปัญหา',
      icon: AlertTriangle,
    },
    {
      id: 'settings' as Screen,
      label: 'ตั้งค่า',
      icon: Settings,
    }
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">EasyConnect</h2>
            <p className="text-sm text-muted-foreground">
              {currentUser.role === 'manager' ? 'ผู้จัดการ' : 'พนักงาน'}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentScreen === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                currentScreen === item.id && 'bg-primary text-primary-foreground'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm">
              {currentUser.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">
              {currentUser.role === 'manager' ? 'ผู้จัดการ' : 'พนักงาน'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}