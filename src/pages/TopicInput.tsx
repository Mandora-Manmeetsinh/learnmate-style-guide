
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const TopicInput = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const exampleTopics = [
    "Newton's Laws of Motion",
    "World War II",
    "Python Programming Loops",
    "Photosynthesis",
    "Shakespeare's Hamlet",
    "Basic Algebra"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Tell us what you'd like to learn about!",
        variant: "destructive"
      });
      return;
    }

    const learningStyle = localStorage.getItem('learningStyle');
    if (!learningStyle) {
      navigate('/learning-style');
      return;
    }

    setIsLoading(true);
    
    // Store the topic for the result page
    localStorage.setItem('currentTopic', topic);
    
    // Simulate API call delay
    setTimeout(() => {
      navigate('/result');
    }, 1500);
  };

  const useSampleTopic = (sampleTopic: string) => {
    setTopic(sampleTopic);
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
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/learning-style')}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="hover:bg-purple-100"
              >
                Restart
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            What Would You Like to Learn?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enter any topic and we'll create a personalized learning experience for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800">Enter Your Topic</CardTitle>
              <CardDescription className="text-gray-600">
                Be specific for the best learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="e.g., Newton's Laws of Motion, World War II, Python Loops..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-lg py-6 pr-12 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    disabled={isLoading}
                  />
                  <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Content...</span>
                    </div>
                  ) : (
                    'Start Learning'
                  )}
                </Button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-gray-500 font-medium">Or try one of these examples:</p>
                <div className="grid grid-cols-2 gap-3">
                  {exampleTopics.map((exampleTopic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => useSampleTopic(exampleTopic)}
                      className="text-sm py-3 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                      disabled={isLoading}
                    >
                      {exampleTopic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
