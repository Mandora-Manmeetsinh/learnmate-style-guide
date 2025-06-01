
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { Trophy, Star, Flame, Target, Award } from 'lucide-react';

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [showBadges, setShowBadges] = useState(false);

  if (!user) return null;

  const xpToNextLevel = (user.level * 100) - (user.xp % 100);
  const levelProgress = ((user.xp % 100) / 100) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-2xl font-bold">{user.level}</span>
              </div>
              <p className="text-sm text-gray-600">Level</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-blue-500 mr-1" />
                <span className="text-2xl font-bold">{user.xp}</span>
              </div>
              <p className="text-sm text-gray-600">XP Points</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="h-5 w-5 text-orange-500 mr-1" />
                <span className="text-2xl font-bold">{user.streak}</span>
              </div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-purple-500 mr-1" />
                <span className="text-2xl font-bold">{user.badges.length}</span>
              </div>
              <p className="text-sm text-gray-600">Badges</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {user.level + 1}</span>
              <span>{xpToNextLevel} XP needed</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => setShowBadges(!showBadges)}
              variant="outline"
              size="sm"
            >
              {showBadges ? 'Hide' : 'Show'} Badges
            </Button>
          </div>
          
          {showBadges && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {user.badges.map((badge) => (
                <Badge key={badge.id} variant="secondary" className="p-2">
                  {badge.icon} {badge.name}
                </Badge>
              ))}
              {user.badges.length === 0 && (
                <p className="text-gray-500 col-span-full text-center py-4">
                  No badges yet. Complete more topics to earn badges!
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
