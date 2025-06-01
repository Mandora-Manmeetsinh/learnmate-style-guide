
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfile } from './UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Clock, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    const topics = JSON.parse(localStorage.getItem('recentTopics') || '[]');
    setRecentTopics(topics.slice(0, 5));
    
    const studyTime = parseInt(localStorage.getItem('totalStudyTime') || '0');
    setTotalStudyTime(studyTime);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <UserProfile />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/learning-style')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Start New Topic
                </Button>
                <Button 
                  onClick={() => navigate('/flashcards')}
                  variant="outline" 
                  className="w-full"
                >
                  Review Flashcards
                </Button>
                <Button 
                  onClick={() => navigate('/study-rooms')}
                  variant="outline" 
                  className="w-full"
                >
                  Join Study Room
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Today's Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Study Time</span>
                    <span className="font-semibold">{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Topics Completed</span>
                    <span className="font-semibold">{recentTopics.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <span className="font-semibold">{user.streak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Topics</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTopics.length > 0 ? (
                <div className="space-y-2">
                  {recentTopics.map((topic, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{topic}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No topics learned yet. Start your first lesson!
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold">Physics Fundamentals</h4>
                  <p className="text-sm text-gray-600">Newton's Laws → Momentum → Energy</p>
                  <Progress value={33} className="mt-2 h-2" />
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold">Programming Basics</h4>
                  <p className="text-sm text-gray-600">Variables → Loops → Functions</p>
                  <Progress value={0} className="mt-2 h-2" />
                </div>
                <Button variant="outline" className="w-full">
                  Explore More Paths
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
