
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Brain } from 'lucide-react';
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
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          AI Doubt Solver
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask any question about this topic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
            className="flex-1"
          />
          <Button 
            onClick={askQuestion} 
            disabled={isLoading || !question.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {doubts.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {doubts.map((doubt) => (
              <div key={doubt.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 mb-2">{doubt.question}</p>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700">{doubt.answer}</p>
                        <Badge variant="secondary" className="mt-2">
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
