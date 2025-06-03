import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, Volume2, VolumeX, RotateCcw, Share, Bookmark, Star, Trophy, Sparkles } from 'lucide-react';
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
  const [hasAwardedXP, setHasAwardedXP] = useState(false);

  useEffect(() => {
    const style = localStorage.getItem('learningStyle');
    const currentTopic = localStorage.getItem('currentTopic');
    
    if (!style || !currentTopic) {
      navigate('/');
      return;
    }
    
    setLearningStyle(style);
    setTopic(currentTopic);

    // Check if XP has already been awarded for this session
    const sessionKey = `xp_awarded_${currentTopic}_${style}_${Date.now().toString().slice(0, -5)}`;
    const alreadyAwarded = localStorage.getItem(sessionKey);
    
    if (!alreadyAwarded && user && !hasAwardedXP) {
      console.log('Awarding XP for new session');
      
      // Award XP and update user progress
      const earnedXP = Math.floor(Math.random() * 50) + 25; // 25-75 XP
      setXpEarned(earnedXP);
      setHasAwardedXP(true);
      
      const newXP = user.xp + earnedXP;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      updateUser({
        xp: newXP,
        level: newLevel
      });

      // Mark this session as awarded
      localStorage.setItem(sessionKey, 'true');

      // Check for new badges
      if (newLevel > user.level) {
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${newLevel}!`
        });
      }

      // Update learning streak and recent topics only once
      const streak = parseInt(localStorage.getItem('learningStreak') || '0');
      localStorage.setItem('learningStreak', (streak + 1).toString());
      
      const recentTopics = JSON.parse(localStorage.getItem('recentTopics') || '[]');
      if (!recentTopics.includes(currentTopic)) {
        recentTopics.unshift(currentTopic);
        localStorage.setItem('recentTopics', JSON.stringify(recentTopics.slice(0, 10)));
      }
    }
  }, [navigate, user, updateUser, hasAwardedXP]);

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
      <div className="min-h-screen bg-background">
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
              <Button
                variant="ghost"
                onClick={() => setShowFlashcards(false)}
                className="flex items-center space-x-2 hover:bg-white/5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Lesson</span>
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-8">
          <FlashcardViewer topic={topic} />
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-3">
              {isSpeaking && (
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full">
                  <Volume2 className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Speaking...</span>
                </div>
              )}
              
              {xpEarned > 0 && (
                <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-full animate-glow-pulse">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-medium">+{xpEarned} XP</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                onClick={() => setShowFlashcards(true)}
                className="flex items-center space-x-2 hover:bg-white/5 glass-effect"
              >
                <Trophy className="h-4 w-4" />
                <span className="hidden md:inline">Flashcards</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleBookmark}
                className="flex items-center space-x-2 hover:bg-white/5"
              >
                <Bookmark className="h-4 w-4" />
                <span className="hidden md:inline">Save</span>
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleShare}
                className="flex items-center space-x-2 hover:bg-white/5"
              >
                <Share className="h-4 w-4" />
                <span className="hidden md:inline">Share</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleSwitchStyle}
                className="flex items-center space-x-2 glass-effect border-white/20 hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden md:inline">Switch Style</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleRestart}
                className="flex items-center space-x-2 glass-effect border-white/20 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden md:inline">Restart</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-glow">
              <span className="text-2xl">{getStyleIcon()}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text">
              {getStyleName()}
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl text-foreground/90 font-semibold mb-3">
            {topic}
          </h2>
          <p className="text-foreground/60 text-lg">
            Content personalized for your learning style
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {renderContent()}
        </div>
        
        {/* Doubt Solver */}
        <div className="mt-12">
          <DoubtSolver topic={topic} />
        </div>
      </div>
    </div>
  );
};

export default Result;
