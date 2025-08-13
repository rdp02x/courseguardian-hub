import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdminSidebar } from '@/components/dashboard/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Upload, 
  BarChart3,
  Plus,
  ArrowRight 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Courses',
      value: '12',
      description: 'Active courses',
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Students',
      value: '1,234',
      description: 'Enrolled students',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'PDF Files',
      value: '456',
      description: 'Uploaded materials',
      icon: Upload,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Views',
      value: '12.5k',
      description: 'This month',
      icon: BarChart3,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  const quickActions = [
    {
      title: 'Upload Course',
      description: 'Create a new course and upload materials',
      action: () => navigate('/admin/upload'),
      icon: Plus,
    },
    {
      title: 'Manage Courses',
      description: 'View and edit existing courses',
      action: () => navigate('/admin/courses'),
      icon: BookOpen,
    },
    {
      title: 'View Students',
      description: 'Manage student accounts and enrollment',
      action: () => navigate('/admin/students'),
      icon: Users,
    },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your learning platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={action.action}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest platform activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">New student registration</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">Course "React Basics" updated</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-muted-foreground">5 PDFs uploaded to "Advanced JS"</span>
                  <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;