
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FlashcardViewer } from '@/components/FlashcardViewer';

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      setShowFlashcards(true);
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
                <span>Back</span>
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
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 hover:bg-purple-100"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Flashcard Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create and study flashcards for any topic
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Generate Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter topic for flashcards..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="text-lg py-6 rounded-xl border-2 border-purple-200 focus:border-purple-400"
                />
                
                <Button
                  type="submit"
                  disabled={!topic.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl"
                >
                  Generate Flashcards
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
