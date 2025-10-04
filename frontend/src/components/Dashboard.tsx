import React from 'react';
import { createFileRoute } from '@tanstack/react-router'


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Building,
  TrendingUp,
  Users
} from 'lucide-react';

import type { Task, Screen } from '../routes/_authenticated/index';


interface DashboardProps {
  tasks: Task[];
  onNavigate: (screen: Screen, task?: Task) => void;
}


export function Dashboard({ tasks, onNavigate }: DashboardProps) {
  // Calculate statistics
  const urgentTasks = tasks.filter(task => task.status === 'urgent').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  // Group tasks by building and floor
  const buildingStats = tasks.reduce((acc, task) => {
    const key = `${task.building} - ชั้น ${task.floor}`;
    if (!acc[key]) {
      acc[key] = { urgent: 0, pending: 0, completed: 0, total: 0 };
    }
    acc[key][task.status]++;
    acc[key].total++;
    return acc;
  }, {} as Record<string, { urgent: number; pending: number; completed: number; total: number }>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleBuildingClick = (building: string, floor: string) => {
    // Navigate to task list with pre-filtered building and floor
    onNavigate('tasks');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ภาพรวมระบบ</h1>
        <p className="text-muted-foreground">
          สถานะงานซ่อมบำรุงทั้งหมดในโรงแรม
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">งานเร่งด่วน</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentTasks}</div>
            <p className="text-xs text-muted-foreground">
              ต้องดำเนินการภายในวันนี้
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รอดำเนินการ</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">
              รอมอบหมายหรือจัดลำดับ
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">กำลังดำเนินการ</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              พนักงานกำลังปฏิบัติงาน
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">เสร็จสิ้น</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              งานที่เสร็จสิ้นแล้ววันนี้
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Building Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              สถานะตามอาคารและชั้น
            </CardTitle>
            <CardDescription>
              คลิกเพื่อดูรายละเอียดงานในแต่ละพื้นที่
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(buildingStats).map(([location, stats]) => (
              <div
                key={location}
                className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => {
                  const [building, floor] = location.split(' - ชั้น ');
                  handleBuildingClick(building, floor);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{location}</h4>
                  <span className="text-sm text-muted-foreground">
                    รวม {stats.total} งาน
                  </span>
                </div>
                <div className="flex space-x-2">
                  {stats.urgent > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      เร่งด่วน {stats.urgent}
                    </Badge>
                  )}
                  {stats.pending > 0 && (
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                      รอดำเนินการ {stats.pending}
                    </Badge>
                  )}
                  {stats.completed > 0 && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      เสร็จสิ้น {stats.completed}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              งานเร่งด่วนล่าสุด
            </CardTitle>
            <CardDescription>
              งานที่ต้องดำเนินการทันที
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks
              .filter(task => task.status === 'urgent')
              .slice(0, 5)
              .map(task => (
                <div
                  key={task.id}
                  className="p-3 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 cursor-pointer transition-colors"
                  onClick={() => onNavigate('task-detail', task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="destructive" className="text-xs">
                        เร่งด่วน
                      </Badge>
                      {!task.assignedTo && (
                        <span className="text-xs text-red-600 mt-1">
                          ยังไม่มอบหมาย
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            }
            {tasks.filter(task => task.status === 'urgent').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p>ไม่มีงานเร่งด่วนในขณะนี้</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


