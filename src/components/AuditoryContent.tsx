
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AuditoryContentProps {
  topic: string;
  setIsSpeaking: (speaking: boolean) => void;
}

const AuditoryContent = ({ topic, setIsSpeaking }: AuditoryContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setSpeechSupported('speechSynthesis' in window);
  }, []);

  const getAuditoryContent = (topic: string) => {
    const baseContent = {
      introduction: `Welcome to your personalized audio lesson on ${topic}. In this session, we'll explore this topic through detailed explanations designed for auditory learners.`,
      sections: [
        {
          title: "Introduction and Overview",
          content: `Let's begin with an introduction to ${topic}. This concept is important because it helps us understand fundamental principles that apply in many situations.`
        },
        {
          title: "Detailed Explanation",
          content: `Now, let's dive deeper into ${topic}. The key aspects you need to understand include the main principles, how they work, and why they matter.`
        },
        {
          title: "Examples and Applications",
          content: `To help you better understand ${topic}, let's look at some real-world examples and practical applications where this concept is used.`
        },
        {
          title: "Summary and Review",
          content: `Let's review what we've learned about ${topic}. Remember the key points we discussed and how they connect to create a complete understanding.`
        }
      ]
    };

    if (topic.toLowerCase().includes('newton')) {
      return {
        introduction: "Welcome to your audio lesson on Newton's Laws of Motion. These three fundamental laws describe the relationship between forces acting on a body and its motion due to those forces.",
        sections: [
          {
            title: "Newton's First Law",
            content: "Newton's First Law, also known as the Law of Inertia, states that an object at rest will remain at rest, and an object in motion will remain in motion at constant velocity, unless acted upon by an external force. Think of a hockey puck sliding on ice - it keeps moving until friction or a wall stops it."
          },
          {
            title: "Newton's Second Law",
            content: "The Second Law establishes the relationship between force, mass, and acceleration. It states that Force equals mass times acceleration, or F equals m times a. This means that the more force you apply to an object, the more it will accelerate. Conversely, heavier objects need more force to achieve the same acceleration."
          },
          {
            title: "Newton's Third Law",
            content: "The Third Law states that for every action, there is an equal and opposite reaction. When you walk, you push against the ground, and the ground pushes back with equal force. This is why you can move forward. Rockets work on this principle - they push exhaust gases down, and the gases push the rocket up."
          },
          {
            title: "Applications and Summary",
            content: "Newton's Laws are everywhere in our daily lives. From the way cars brake using the first law, to how rockets launch using the third law. Understanding these principles helps us predict and control motion in engineering, sports, and space exploration."
          }
        ]
      };
    }

    return baseContent;
  };

  const content = getAuditoryContent(topic);

  const speakText = (text: string) => {
    if (!speechSupported) {
      toast({
        title: "Speech not supported",
        description: "Your browser doesn't support text-to-speech",
        variant: "destructive"
      });
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
      toast({
        title: "Speech error",
        description: "There was an error with text-to-speech",
        variant: "destructive"
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsSpeaking(false);
  };

  const playSection = (index: number) => {
    setCurrentSection(index);
    const section = content.sections[index];
    const textToSpeak = `${section.title}. ${section.content}`;
    speakText(textToSpeak);
  };

  const playAll = () => {
    const allText = content.introduction + '. ' + 
      content.sections.map(section => `${section.title}. ${section.content}`).join('. ');
    speakText(allText);
  };

  return (
    <div className="space-y-6">
      {/* Audio Controls */}
      <Card className="border-0 bg-gradient-to-r from-blue-100 to-cyan-100 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Audio Learning</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {isPlaying ? (
                <Button
                  onClick={stopSpeech}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              ) : (
                <Button
                  onClick={playAll}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  disabled={!speechSupported}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-700 text-lg">
            {speechSupported 
              ? "Click 'Play All' to listen to the complete lesson, or play individual sections below."
              : "Text-to-speech is not supported in your browser. Please read the content below."
            }
          </CardDescription>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {content.introduction}
          </p>
          <Button
            onClick={() => speakText(content.introduction)}
            variant="outline"
            className="flex items-center space-x-2"
            disabled={!speechSupported || isPlaying}
          >
            <Volume2 className="h-4 w-4" />
            <span>Listen to Introduction</span>
          </Button>
        </CardContent>
      </Card>

      {/* Content Sections */}
      {content.sections.map((section, index) => (
        <Card 
          key={index} 
          className={`border-0 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ${
            currentSection === index && isPlaying ? 'ring-2 ring-blue-400 bg-blue-50/80' : ''
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-800">{section.title}</CardTitle>
              <Button
                onClick={() => playSection(index)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                disabled={!speechSupported || isPlaying}
              >
                <Volume2 className="h-4 w-4" />
                <span>Listen</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 leading-relaxed">
              {section.content}
            </p>
          </CardContent>
        </Card>
      ))}

      {/* Audio Tips */}
      <Card className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Audio Learning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Listen actively - take notes while the content plays</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Replay sections you want to understand better</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Use headphones for better audio quality</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Adjust speech rate in your browser settings if needed</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditoryContent;
