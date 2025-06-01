
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw, Trophy, Zap } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface KinestheticContentProps {
  topic: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const KinestheticContent = ({ topic }: KinestheticContentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>([]);

  const getQuizContent = (topic: string): Question[] => {
    const baseQuestions: Question[] = [
      {
        question: `What is the main principle behind ${topic}?`,
        options: [
          "It follows basic fundamental laws",
          "It has multiple applications",
          "It requires understanding of context",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: `${topic} encompasses fundamental principles with multiple applications that require contextual understanding.`
      },
      {
        question: `How is ${topic} commonly applied in real-world scenarios?`,
        options: [
          "Through theoretical analysis only",
          "In practical problem-solving",
          "Only in academic settings",
          "It has no real applications"
        ],
        correctAnswer: 1,
        explanation: `${topic} is most valuable when applied to practical problem-solving in real-world scenarios.`
      },
      {
        question: `What makes ${topic} important to understand?`,
        options: [
          "It's required for tests",
          "It builds foundational knowledge",
          "It's easy to memorize",
          "It's trending in social media"
        ],
        correctAnswer: 1,
        explanation: `Understanding ${topic} is important because it builds foundational knowledge for more complex concepts.`
      }
    ];

    if (topic.toLowerCase().includes('newton')) {
      return [
        {
          question: "According to Newton's First Law, what happens to an object at rest?",
          options: [
            "It will start moving on its own",
            "It will remain at rest unless acted upon by a force",
            "It will gradually slow down",
            "It will move in a circular path"
          ],
          correctAnswer: 1,
          explanation: "Newton's First Law (Law of Inertia) states that an object at rest will remain at rest unless acted upon by an external force."
        },
        {
          question: "What does Newton's Second Law tell us about force and acceleration?",
          options: [
            "Force and acceleration are unrelated",
            "Force equals mass times acceleration (F=ma)",
            "Acceleration always equals force",
            "Mass doesn't affect acceleration"
          ],
          correctAnswer: 1,
          explanation: "Newton's Second Law establishes that Force = mass × acceleration (F=ma), showing the direct relationship between force, mass, and acceleration."
        },
        {
          question: "Which example best demonstrates Newton's Third Law?",
          options: [
            "A ball rolling down a hill",
            "Walking - you push the ground, the ground pushes back",
            "A car accelerating on a highway",
            "Water flowing in a river"
          ],
          correctAnswer: 1,
          explanation: "Newton's Third Law states that for every action there is an equal and opposite reaction. Walking demonstrates this perfectly - you push against the ground and the ground pushes back with equal force."
        }
      ];
    }

    return baseQuestions;
  };

  const questions = getQuizContent(topic);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newCompleted = [...completedQuestions];
    newCompleted[currentQuestion] = true;
    setCompletedQuestions(newCompleted);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great job! You got it right."
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Don't worry, learning from mistakes is part of the process!",
        variant: "destructive"
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompletedQuestions([]);
  };

  const isQuizComplete = currentQuestion === questions.length - 1 && showExplanation;
  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Interactive Quiz</CardTitle>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/80 text-gray-700">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge variant="secondary" className="bg-white/80 text-gray-700">
                Score: {score}/{questions.length}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-gray-700">
            Test your understanding through interactive questions
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/60 rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Question */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";
              
              if (!showExplanation) {
                buttonClass += "border-gray-200 hover:border-green-300 hover:bg-green-50";
              } else {
                if (index === questions[currentQuestion].correctAnswer) {
                  buttonClass += "border-green-400 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) {
                  buttonClass += "border-red-400 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              }

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                  variant="outline"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-left">{option}</span>
                    {showExplanation && (
                      <div className="ml-2">
                        {index === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : index === selectedAnswer ? (
                          <XCircle className="h-5 w-5 text-red-600" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="border-0 bg-blue-50 shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span>Explanation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {questions[currentQuestion].explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {showExplanation && (
        <div className="flex justify-center space-x-4">
          {!isQuizComplete ? (
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl"
            >
              Next Question
            </Button>
          ) : (
            <div className="text-center space-y-4">
              <Card className="border-0 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-center space-x-2">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <CardTitle className="text-2xl text-gray-800">Quiz Complete!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl text-gray-700 mb-4">
                    Your Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
                  </p>
                  <p className="text-gray-600 mb-6">
                    {score === questions.length 
                      ? "Perfect! You've mastered this topic!" 
                      : score >= questions.length * 0.7 
                      ? "Great job! You have a solid understanding." 
                      : "Good effort! Consider reviewing the material and trying again."
                    }
                  </p>
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Learning Tips */}
      <Card className="border-0 bg-gradient-to-r from-yellow-100 to-orange-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Kinesthetic Learning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Take your time to think through each question</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Read explanations carefully to understand the reasoning</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Retake the quiz to reinforce your learning</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Try to apply these concepts to real-world situations</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default KinestheticContent;
