
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Headphones, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LearningStyle = () => {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const learningStyles = [
    {
      id: 'visual',
      title: 'Visual Learner',
      icon: BookOpen,
      description: 'I learn best with diagrams, charts, and visual summaries',
      details: 'Perfect for seeing the big picture with organized content and visual aids',
      gradient: 'from-pink-400 to-rose-400',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      id: 'auditory',
      title: 'Auditory Learner',
      icon: Headphones,
      description: 'I learn best by listening and hearing explanations',
      details: 'Great for absorbing information through spoken content and audio',
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'kinesthetic',
      title: 'Kinesthetic Learner',
      icon: Zap,
      description: 'I learn best through hands-on activities and practice',
      details: 'Ideal for learning through interaction, quizzes, and active engagement',
      gradient: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-50 to-emerald-50'
    }
  ];

  const selectStyle = (style: string) => {
    setSelectedStyle(style);
    localStorage.setItem('learningStyle', style);
    setTimeout(() => navigate('/topic-input'), 300);
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
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:bg-purple-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            What's Your Learning Style?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the learning approach that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {learningStyles.map((style) => {
            const IconComponent = style.icon;
            const isSelected = selectedStyle === style.id;
            
            return (
              <Card
                key={style.id}
                className={`border-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isSelected 
                    ? 'ring-4 ring-purple-400 shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                } bg-gradient-to-b ${style.bgGradient} to-white`}
                onClick={() => selectStyle(style.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${style.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                    {style.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-500 mb-6">
                    {style.details}
                  </p>
                  <Button
                    className={`w-full bg-gradient-to-r ${style.gradient} hover:opacity-90 text-white py-3 rounded-xl shadow-lg transition-all duration-300`}
                  >
                    Choose This Style
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningStyle;
