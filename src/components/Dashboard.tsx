
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UserProfile } from './UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Clock, TrendingUp, Users, Sparkles, Target, Zap, Trophy, Brain } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                LearnMate
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-3">
            Welcome back, <span className="gradient-text">{user.name}</span>!
          </h1>
          <p className="text-foreground/60 text-lg">Ready to continue your learning journey?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <UserProfile />
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Sparkles className="mr-3 h-6 w-6 text-purple-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate('/learning-style')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 text-base font-semibold shadow-glow"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Start New Topic
                </Button>
                <Button 
                  onClick={() => navigate('/flashcards')}
                  variant="outline" 
                  className="w-full glass-effect border-white/20 hover:bg-white/10 h-12"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Review Flashcards
                </Button>
                <Button 
                  onClick={() => navigate('/study-rooms')}
                  variant="outline" 
                  className="w-full glass-effect border-white/20 hover:bg-white/10 h-12"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Study Room
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="mr-3 h-6 w-6 text-emerald-400" />
                  Today's Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <span className="text-foreground/70">Study Time</span>
                    </div>
                    <span className="font-semibold text-lg">{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-green-400" />
                      <span className="text-foreground/70">Topics Completed</span>
                    </div>
                    <span className="font-semibold text-lg">{recentTopics.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 glass-effect rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-orange-400" />
                      <span className="text-foreground/70">Current Streak</span>
                    </div>
                    <span className="font-semibold text-lg">{user.streak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Recent Topics</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTopics.length > 0 ? (
                <div className="space-y-3">
                  {recentTopics.map((topic, index) => (
                    <div key={index} className="p-4 glass-effect rounded-xl hover:bg-white/10 transition-colors">
                      <p className="font-medium text-foreground/90">{topic}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/40 text-lg">
                    No topics learned yet. Start your first lesson!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Learning Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 glass-effect rounded-xl border-l-4 border-purple-500">
                  <h4 className="font-semibold text-lg mb-1">Physics Fundamentals</h4>
                  <p className="text-sm text-foreground/60 mb-3">Newton's Laws → Momentum → Energy</p>
                  <Progress value={33} className="h-2 bg-white/10" />
                </div>
                <div className="p-4 glass-effect rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-semibold text-lg mb-1">Programming Basics</h4>
                  <p className="text-sm text-foreground/60 mb-3">Variables → Loops → Functions</p>
                  <Progress value={0} className="h-2 bg-white/10" />
                </div>
                <Button variant="outline" className="w-full glass-effect border-white/20 hover:bg-white/10">
                  <Sparkles className="mr-2 h-4 w-4" />
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
