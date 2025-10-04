import React from 'react';
import { Button } from './ui/button';
import { LogOut, Bell } from 'lucide-react';
import type { User } from '@/routes/_authenticated/index';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
}

export function Header({ currentUser, onLogout }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold">
          สวัสดี, {currentUser.name}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          ออกจากระบบ
        </Button>
      </div>
    </header>
  );
}