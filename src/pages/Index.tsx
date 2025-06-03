
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, BookOpen, Headphones, Zap, User, LogIn, Search, ArrowRight, Sparkles, Target, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [learningStreak, setLearningStreak] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchTopic, setSearchTopic] = useState('');

  useEffect(() => {
    const streak = localStorage.getItem('learningStreak') || '0';
    setLearningStreak(parseInt(streak));
  }, []);

  const startLearning = () => {
    if (searchTopic.trim()) {
      localStorage.setItem('currentTopic', searchTopic);
      navigate('/learning-style');
    } else if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/learning-style');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      localStorage.setItem('currentTopic', searchTopic);
      navigate('/learning-style');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
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
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{user.name}</span>
                  </div>
                  <Button onClick={() => navigate('/dashboard')} variant="outline" className="glass-effect border-white/20 hover:bg-white/10">
                    Dashboard
                  </Button>
                  <Button onClick={logout} variant="ghost" className="hover:bg-white/5">
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="glass-effect border-white/20 hover:bg-white/10"
                  variant="outline"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Button>
              )}
              
              {learningStreak > 0 && (
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium text-foreground/90">
                    {learningStreak} sessions
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-3xl mb-8 animate-float shadow-glow-lg">
                <Brain className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
                <span className="gradient-text">LearnMate</span>
              </h1>
              <p className="text-2xl md:text-3xl text-foreground/80 mb-4 font-medium">
                Your Personalized AI Tutor
              </p>
              <p className="text-lg text-foreground/60 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover your unique learning style and get AI-powered explanations tailored just for you. 
                Whether you're a visual, auditory, or kinesthetic learner, we've got you covered.
              </p>
            </div>

            {/* Search Section */}
            <div className="mb-16 animate-slide-up">
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn today? (e.g., Newton's Laws, Photosynthesis)"
                    value={searchTopic}
                    onChange={(e) => setSearchTopic(e.target.value)}
                    className="glass-card h-16 pl-14 pr-20 text-lg border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="absolute right-2 top-2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-glow"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </form>
              
              <Button 
                onClick={startLearning}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-2xl shadow-glow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 font-semibold"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Start Learning'}
                <Sparkles className="h-6 w-6 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                <p className="text-foreground/60">Topics Covered</p>
              </div>
              <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">50,000+</h3>
                <p className="text-foreground/60">Active Learners</p>
              </div>
              <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">95%</h3>
                <p className="text-foreground/60">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-6">
            <span className="gradient-text">Personalized Learning Experience</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Choose your learning style and get content tailored specifically for how you learn best
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-display text-purple-300">Visual Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/60 text-center text-lg leading-relaxed">
                Diagrams, summaries, and visual representations to help you understand complex topics through imagery and structured layouts
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-display text-blue-300">Auditory Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/60 text-center text-lg leading-relaxed">
                Listen to explanations with advanced text-to-speech technology for better retention and understanding through audio
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-display text-emerald-300">Kinesthetic Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-foreground/60 text-center text-lg leading-relaxed">
                Interactive quizzes and hands-on activities to engage your learning process through practice and experimentation
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
