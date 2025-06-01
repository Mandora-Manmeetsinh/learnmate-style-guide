import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, Volume2, VolumeX, RotateCcw, Share, Bookmark, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import VisualContent from '@/components/VisualContent';
import AuditoryContent from '@/components/AuditoryContent';
import KinestheticContent from '@/components/KinestheticContent';
import { DoubtSolver } from '@/components/DoubtSolver';
import { FlashcardViewer } from '@/components/FlashcardViewer';

const Result = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [learningStyle, setLearningStyle] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    const style = localStorage.getItem('learningStyle');
    const currentTopic = localStorage.getItem('currentTopic');
    
    if (!style || !currentTopic) {
      navigate('/');
      return;
    }
    
    setLearningStyle(style);
    setTopic(currentTopic);

    // Award XP and update user progress
    const earnedXP = Math.floor(Math.random() * 50) + 25; // 25-75 XP
    setXpEarned(earnedXP);
    
    if (user) {
      const newXP = user.xp + earnedXP;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      updateUser({
        xp: newXP,
        level: newLevel
      });

      // Check for new badges
      if (newLevel > user.level) {
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${newLevel}!`
        });
      }
    }

    // Update learning streak and recent topics
    const streak = parseInt(localStorage.getItem('learningStreak') || '0');
    localStorage.setItem('learningStreak', (streak + 1).toString());
    
    const recentTopics = JSON.parse(localStorage.getItem('recentTopics') || '[]');
    recentTopics.unshift(currentTopic);
    localStorage.setItem('recentTopics', JSON.stringify(recentTopics.slice(0, 10)));
  }, [navigate, user, updateUser]);

  const handleRestart = () => {
    navigate('/');
  };

  const handleSwitchStyle = () => {
    navigate('/learning-style');
  };

  const handleShare = () => {
    const url = `${window.location.origin}/?topic=${encodeURIComponent(topic)}&style=${learningStyle}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Share this learning session with others"
    });
  };

  const handleBookmark = () => {
    localStorage.setItem('lastTopic', topic);
    localStorage.setItem('lastStyle', learningStyle);
    toast({
      title: "Lesson bookmarked!",
      description: "You can return to this lesson anytime"
    });
  };

  const renderContent = () => {
    switch (learningStyle) {
      case 'visual':
        return <VisualContent topic={topic} />;
      case 'auditory':
        return <AuditoryContent topic={topic} setIsSpeaking={setIsSpeaking} />;
      case 'kinesthetic':
        return <KinestheticContent topic={topic} />;
      default:
        return <div>Unknown learning style</div>;
    }
  };

  const getStyleIcon = () => {
    switch (learningStyle) {
      case 'visual':
        return '🎨';
      case 'auditory':
        return '🔊';
      case 'kinesthetic':
        return '🧪';
      default:
        return '📚';
    }
  };

  const getStyleName = () => {
    switch (learningStyle) {
      case 'visual':
        return 'Visual Learning';
      case 'auditory':
        return 'Auditory Learning';
      case 'kinesthetic':
        return 'Kinesthetic Learning';
      default:
        return 'Learning';
    }
  };

  if (showFlashcards) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
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
                onClick={() => setShowFlashcards(false)}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Lesson</span>
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-8">
          <FlashcardViewer topic={topic} />
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-2">
              {isSpeaking && (
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Speaking...</span>
                </div>
              )}
              
              {xpEarned > 0 && (
                <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-2 rounded-full">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">+{xpEarned} XP</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                onClick={() => setShowFlashcards(true)}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <Trophy className="h-4 w-4" />
                <span className="hidden md:inline">Flashcards</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleBookmark}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <Bookmark className="h-4 w-4" />
                <span className="hidden md:inline">Save</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleShare}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <Share className="h-4 w-4" />
                <span className="hidden md:inline">Share</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleSwitchStyle}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden md:inline">Switch Style</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden md:inline">Restart</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <span className="text-3xl">{getStyleIcon()}</span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {getStyleName()}
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-2">
            {topic}
          </h2>
          <p className="text-gray-600">
            Content personalized for your learning style
          </p>
        </div>

        {/* Content */}
        {renderContent()}
        
        {/* Doubt Solver */}
        <DoubtSolver topic={topic} />
      </div>
    </div>
  );
};

export default Result;
