import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { Sidebar } from '@/components/Sidebar';

import { Login } from '@/components/Login';
import { Header } from '@/components/Header';
import { createFileRoute } from '@tanstack/react-router';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';


export type UserRole = 'manager' | 'staff';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  username: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  status: 'urgent' | 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  assignedToName?: string;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  completedAt?: string;
  notes?: string;
  images?: string[];
}

export type Screen = 'login' | 'dashboard' | 'tasks' | 'task-detail' | 'report-issue' | 'settings';


function Index() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'ล้างแอร์ - ห้อง W-501',
      description: 'การบำรุงรักษาประจำ - ล้างแอร์และเช็คสภาพ',
      location: 'West Wing ชั้น 5',
      building: 'West Wing',
      floor: '5',
      room: 'W-501',
      equipment: 'เครื่องปรับอากาศ',
      status: 'urgent',
      priority: 'high',
      assignedTo: 'staff1',
      assignedToName: 'สมชาย ใจดี',
      createdBy: 'manager1',
      createdAt: '2024-01-15T08:00:00Z',
      dueDate: '2024-01-15T16:00:00Z'
    },
    {
      id: '2',
      title: 'เช็คทีวี - ห้อง E-302',
      description: 'ทีวีเปิดไม่ติด ไฟสถานะไม่ขึ้น',
      location: 'East Wing ชั้น 3',
      building: 'East Wing',
      floor: '3',
      room: 'E-302',
      equipment: 'ทีวี',
      status: 'urgent',
      priority: 'high',
      createdBy: 'staff2',
      createdAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-15T18:00:00Z'
    },
    {
      id: '3',
      title: 'ตรวจสอบระบบน้ำ - ห้อง W-503',
      description: 'ความดันน้ำอ่อน ตรวจสอบระบบประปา',
      location: 'West Wing ชั้น 5',
      building: 'West Wing',
      floor: '5',
      room: 'W-503',
      equipment: 'ระบบประปา',
      status: 'pending',
      priority: 'medium',
      createdBy: 'manager1',
      createdAt: '2024-01-15T09:00:00Z',
      dueDate: '2024-01-16T12:00:00Z'
    },
    {
      id: '4',
      title: 'เปลี่ยนหลับใน - ห้อง N-201',
      description: 'หลอดไฟในห้องน้ำขาด เปลี่ยนหลอดใหม่',
      location: 'North Wing ชั้น 2',
      building: 'North Wing',
      floor: '2',
      room: 'N-201',
      equipment: 'ระบบไฟฟ้า',
      status: 'completed',
      priority: 'low',
      assignedTo: 'staff1',
      assignedToName: 'สมชาย ใจดี',
      createdBy: 'staff3',
      createdAt: '2024-01-14T14:00:00Z',
      dueDate: '2024-01-15T10:00:00Z',
      completedAt: '2024-01-15T09:30:00Z'
    }
  ]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentScreen(user.role === 'manager' ? 'dashboard' : 'tasks');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setSelectedTask(null);
  };

  const handleNavigate = (screen: Screen, task?: Task) => {
    setCurrentScreen(screen);
    if (task) {
      setSelectedTask(task);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, task]);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
  <SidebarProvider >
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentUser={currentUser}
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto">
          {currentScreen === 'dashboard' && (
            <Dashboard 
              tasks={tasks}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>
    </div>
  </SidebarProvider>
  );
}

export const Route = createFileRoute('/_authenticated/')({
  component: Index,
});