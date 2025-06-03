import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Target, CheckCircle, Sparkles } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      {/* Overview Section */}
      <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-glow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-display gradient-text">Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/80 leading-relaxed">{content.overview}</p>
        </CardContent>
      </Card>

      {/* Key Points Section */}
      <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-glow">
              <Target className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-display gradient-text">Key Points</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {content.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 glass-effect rounded-2xl hover:bg-white/5 transition-all duration-300 group">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-foreground/80 font-medium text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Elements Section */}
      <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-glow">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-display gradient-text">Visual Learning Aids</CardTitle>
          </div>
          <CardDescription className="text-foreground/60 text-lg mt-2">
            Imagine these visual representations to enhance understanding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {content.visualElements.map((element, index) => (
              <div key={index} className="p-6 glass-effect rounded-2xl border-2 border-dashed border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    Visual Aid {index + 1}
                  </Badge>
                </div>
                <p className="text-foreground/80 leading-relaxed">{element}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="glass-card border-white/10 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10">
        <CardHeader>
          <div className="flex items-center justify-center space-x-3">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <CardTitle className="text-3xl font-display text-center gradient-text">Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/80 leading-relaxed text-center font-medium">
            {content.summary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualContent;
