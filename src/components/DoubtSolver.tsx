
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Brain, Sparkles } from 'lucide-react';
import { Doubt } from '@/types';

interface DoubtSolverProps {
  topic: string;
}

export const DoubtSolver = ({ topic }: DoubtSolverProps) => {
  const [question, setQuestion] = useState('');
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response
    const newDoubt: Doubt = {
      id: Date.now().toString(),
      userId: 'current-user',
      topicId: topic,
      question: question,
      answer: `Based on the topic "${topic}", here's a detailed explanation: ${question} is an important concept that relates to the fundamental principles we've been discussing. This involves understanding the core mechanisms and their practical applications in real-world scenarios.`,
      createdAt: new Date().toISOString(),
      resolvedAt: new Date().toISOString()
    };

    setTimeout(() => {
      setDoubts(prev => [newDoubt, ...prev]);
      setQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-3xl font-display gradient-text">
            AI Doubt Solver
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-3">
          <Input
            placeholder="Ask any question about this topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
            className="flex-1 glass-effect border-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 text-lg"
          />
          <Button 
            onClick={askQuestion} 
            disabled={isLoading || !question.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 h-12 shadow-glow"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>

        {doubts.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {doubts.map((doubt) => (
              <div key={doubt.id} className="glass-effect rounded-2xl p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground/90 mb-3 text-lg">{doubt.question}</p>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground/80 leading-relaxed mb-3">{doubt.answer}</p>
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
