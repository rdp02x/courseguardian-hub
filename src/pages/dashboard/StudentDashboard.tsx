import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StudentSidebar } from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-blue-50 mr-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm font-medium text-foreground">Enrolled Courses</p>
                <p className="text-xs text-muted-foreground">Available now</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-green-50 mr-4">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24h</p>
                <p className="text-sm font-medium text-foreground">Study Time</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-purple-50 mr-4">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm font-medium text-foreground">Completed</p>
                <p className="text-xs text-muted-foreground">Courses finished</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center p-6">
              <div className="p-3 rounded-full bg-orange-50 mr-4">
                <TrendingUp className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">92%</p>
                <p className="text-sm font-medium text-foreground">Progress</p>
                <p className="text-xs text-muted-foreground">Average score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Your learning dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">📚 Browse Courses</h4>
                  <p className="text-sm text-muted-foreground">
                    Select a course from the sidebar to view available study materials and PDFs.
                  </p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">🔍 Search Features</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the search bar in the sidebar to quickly find specific courses.
                  </p>
                </div>
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">📄 Secure Reading</h4>
                  <p className="text-sm text-muted-foreground">
                    Click on any PDF to open it in our secure viewer with full content protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your learning progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">Viewed "Introduction to React"</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">Completed "JavaScript Basics"</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-muted-foreground">Started "Advanced CSS"</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-muted-foreground">Downloaded study materials</span>
                  <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;