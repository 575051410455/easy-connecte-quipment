import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { User } from '@/routes/_authenticated';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock users for demo
  const mockUsers: Record<string, User> = {
    '1': {
      id: 'manager1',
      name: 'ผู้จัดการ สมศักดิ์',
      role: 'manager',
      username: 'manager'
    },
    'staff': {
      id: 'staff1',
      name: 'สมชาย ใจดี',
      role: 'staff',
      username: 'staff'
    },
    'housekeeper': {
      id: 'staff2',
      name: 'สมหญิง รักงาน',
      role: 'staff',
      username: 'housekeeper'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[username];
      if (user && password === '1') {
        onLogin(user);
      } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-32 h-32 rounded-lg flex items-center justify-center">
            <img src="../../public/images/logoeasy.png" alt="Easy Connect Equipment" />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">บัญชีทดสอบ:</p>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>👨‍💼 ผู้จัดการ: manager / password</div>
              <div>🔧 ช่าง: staff / password</div>
              <div>🧹 แม่บ้าน: housekeeper / password</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}