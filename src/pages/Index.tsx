
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Headphones, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [learningStreak, setLearningStreak] = useState(0);

  useEffect(() => {
    const streak = localStorage.getItem('learningStreak') || '0';
    setLearningStreak(parseInt(streak));
  }, []);

  const startLearning = () => {
    navigate('/learning-style');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LearnMate
              </span>
            </div>
            {learningStreak > 0 && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  {learningStreak} sessions completed
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 animate-pulse">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              LearnMate
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 leading-relaxed">
              Your Personalized AI Tutor
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
              Discover your unique learning style and get AI-powered explanations tailored just for you. 
              Whether you're a visual, auditory, or kinesthetic learner, we've got you covered.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-700">Visual Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Diagrams, summaries, and visual representations to help you understand complex topics
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-700">Auditory Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Listen to explanations with text-to-speech technology for better retention
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-purple-700">Kinesthetic Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Interactive quizzes and hands-on activities to engage your learning process
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={startLearning}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
