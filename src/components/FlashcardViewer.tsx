
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flashcard } from '@/types';
import { Heart, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardViewerProps {
  topic: string;
}

export const FlashcardViewer = ({ topic }: FlashcardViewerProps) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Generate flashcards for the topic
    const mockFlashcards: Flashcard[] = [
      {
        id: '1',
        topicId: topic,
        question: `What is the main concept of ${topic}?`,
        answer: `The main concept involves understanding the fundamental principles and applications of ${topic}.`,
        difficulty: 'medium',
        createdAt: new Date().toISOString(),
        isFavorite: false
      },
      {
        id: '2',
        topicId: topic,
        question: `How is ${topic} applied in real life?`,
        answer: `${topic} has practical applications in various fields including science, technology, and everyday problem-solving.`,
        difficulty: 'hard',
        createdAt: new Date().toISOString(),
        isFavorite: false
      },
      {
        id: '3',
        topicId: topic,
        question: `What are the key components of ${topic}?`,
        answer: `The key components include theoretical foundations, practical applications, and real-world examples.`,
        difficulty: 'easy',
        createdAt: new Date().toISOString(),
        isFavorite: false
      }
    ];
    
    setFlashcards(mockFlashcards);
  }, [topic]);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const toggleFavorite = () => {
    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id 
        ? { ...card, isFavorite: !card.isFavorite }
        : card
    ));
  };

  if (!currentCard) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Flashcards: {topic}</h3>
        <p className="text-gray-600">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
      </div>

      <Card 
        className="min-h-[300px] cursor-pointer transform transition-transform hover:scale-105"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardHeader className="text-center">
          <div className="flex justify-between items-center">
            <Badge variant={currentCard.difficulty === 'easy' ? 'secondary' : 
                          currentCard.difficulty === 'medium' ? 'default' : 'destructive'}>
              {currentCard.difficulty}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite();
              }}
            >
              <Heart 
                className={`h-4 w-4 ${currentCard.isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex items-center justify-center min-h-[200px] p-8">
          <div className="text-center">
            <div className={`transition-opacity duration-300 ${isFlipped ? 'opacity-0 absolute' : 'opacity-100'}`}>
              <h4 className="text-lg font-semibold mb-4">Question:</h4>
              <p className="text-gray-700 text-lg">{currentCard.question}</p>
            </div>
            
            <div className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 absolute'}`}>
              <h4 className="text-lg font-semibold mb-4 text-green-600">Answer:</h4>
              <p className="text-gray-700 text-lg">{currentCard.answer}</p>
            </div>
            
            {!isFlipped && (
              <p className="text-sm text-gray-500 mt-4">Click to reveal answer</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button onClick={prevCard} variant="outline" disabled={flashcards.length <= 1}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={() => setIsFlipped(!isFlipped)} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Flip Card
        </Button>
        
        <Button onClick={nextCard} variant="outline" disabled={flashcards.length <= 1}>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
