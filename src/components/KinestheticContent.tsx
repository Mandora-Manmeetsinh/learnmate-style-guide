import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw, Trophy, Zap, Target, Sparkles } from 'lucide-react';
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
    <div className="space-y-8 animate-fade-in">
      {/* Quiz Header */}
      <Card className="glass-card border-white/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-glow">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-display gradient-text">Interactive Quiz</CardTitle>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="glass-effect border-white/20 text-base px-4 py-2">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge variant="secondary" className="glass-effect border-white/20 text-base px-4 py-2">
                Score: {score}/{questions.length}
              </Badge>
            </div>
          </div>
          <CardDescription className="text-foreground/70 text-lg mt-4">
            Test your understanding through interactive questions
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="w-full glass-effect rounded-full h-4 mt-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-4 rounded-full transition-all duration-500 shadow-glow"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Question */}
      <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-display text-foreground/90 leading-relaxed">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => {
              let buttonClass = "w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 text-lg ";
              
              if (!showExplanation) {
                buttonClass += "glass-effect border-white/20 hover:border-emerald-400/50 hover:bg-white/10 hover:shadow-glow";
              } else {
                if (index === questions[currentQuestion].correctAnswer) {
                  buttonClass += "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-glow";
                } else if (index === selectedAnswer && selectedAnswer !== questions[currentQuestion].correctAnswer) {
                  buttonClass += "border-red-400 bg-red-500/20 text-red-300";
                } else {
                  buttonClass += "border-white/10 bg-white/5 text-foreground/60";
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
                    <span className="text-left font-medium">{option}</span>
                    {showExplanation && (
                      <div className="ml-4">
                        {index === questions[currentQuestion].correctAnswer ? (
                          <CheckCircle className="h-6 w-6 text-emerald-400" />
                        ) : index === selectedAnswer ? (
                          <XCircle className="h-6 w-6 text-red-400" />
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
        <Card className="glass-card border-blue-500/30 bg-blue-500/10 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center space-x-3">
              <Target className="h-6 w-6 text-blue-400" />
              <span className="text-blue-300">Explanation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 leading-relaxed text-lg">
              {questions[currentQuestion].explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {showExplanation && (
        <div className="flex justify-center space-x-6">
          {!isQuizComplete ? (
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              Next Question
              <Target className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <div className="text-center space-y-6 w-full max-w-2xl">
              <Card className="glass-card border-white/10 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10">
                <CardHeader>
                  <div className="flex items-center justify-center space-x-3">
                    <Trophy className="h-10 w-10 text-yellow-400" />
                    <CardTitle className="text-3xl font-display gradient-text">Quiz Complete!</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-2xl text-foreground/90 font-semibold mb-4">
                    Your Score: {score}/{questions.length} ({Math.round((score/questions.length) * 100)}%)
                  </p>
                  <p className="text-foreground/70 text-lg mb-8">
                    {score === questions.length 
                      ? "Perfect! You've mastered this topic!" 
                      : score >= questions.length * 0.7 
                      ? "Great job! You have a solid understanding." 
                      : "Good effort! Consider reviewing the material and trying again."
                    }
                  </p>
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Learning Tips */}
      <Card className="glass-card border-white/10 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-amber-400" />
            <CardTitle className="text-xl font-display text-amber-300">Kinesthetic Learning Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-foreground/80">
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Take your time to think through each question</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Read explanations carefully to understand the reasoning</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Retake the quiz to reinforce your learning</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span>Try to apply these concepts to real-world situations</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default KinestheticContent;
