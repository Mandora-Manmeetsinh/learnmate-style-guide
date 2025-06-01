
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Target, CheckCircle } from 'lucide-react';

interface VisualContentProps {
  topic: string;
}

const VisualContent = ({ topic }: VisualContentProps) => {
  // This would typically come from an API call to GPT-4
  const getVisualContent = (topic: string) => {
    const baseContent = {
      overview: `${topic} is a fundamental concept that can be understood through visual organization and structured learning.`,
      keyPoints: [
        `Main principle of ${topic}`,
        `How ${topic} works in practice`,
        `Real-world applications of ${topic}`,
        `Common misconceptions about ${topic}`
      ],
      visualElements: [
        "Concept diagram showing relationships",
        "Step-by-step process visualization",
        "Comparison charts and tables",
        "Timeline or flowchart representation"
      ],
      summary: `Understanding ${topic} requires breaking down complex ideas into visual components that show relationships and processes clearly.`
    };

    // Topic-specific content
    if (topic.toLowerCase().includes('newton')) {
      return {
        overview: "Newton's Laws of Motion describe the relationship between forces and motion, forming the foundation of classical mechanics.",
        keyPoints: [
          "First Law: An object at rest stays at rest unless acted upon by force",
          "Second Law: Force equals mass times acceleration (F=ma)",
          "Third Law: For every action, there is an equal and opposite reaction",
          "These laws apply to all objects in the universe"
        ],
        visualElements: [
          "Force diagrams showing vector directions",
          "Before/after motion illustrations",
          "Real-world examples (car braking, rocket launch)",
          "Mathematical formula breakdowns"
        ],
        summary: "Newton's Laws provide a visual framework for understanding how forces create motion in our everyday world."
      };
    }

    return baseContent;
  };

  const content = getVisualContent(topic);

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed">{content.overview}</p>
        </CardContent>
      </Card>

      {/* Key Points Section */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Key Points</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {content.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 font-medium">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Elements Section */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800">Visual Learning Aids</CardTitle>
          </div>
          <CardDescription>Imagine these visual representations to enhance understanding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {content.visualElements.map((element, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Visual Aid {index + 1}
                  </Badge>
                </div>
                <p className="text-gray-700">{element}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="border-0 bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 text-center">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 leading-relaxed text-center font-medium">
            {content.summary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualContent;
