
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, Users, Plus, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { StudyRoom } from '@/types';

const StudyRoomsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomTopic, setNewRoomTopic] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Load study rooms from localStorage
    const rooms = JSON.parse(localStorage.getItem('studyRooms') || '[]');
    setStudyRooms(rooms);
  }, []);

  const createRoom = () => {
    if (!newRoomName.trim() || !newRoomTopic.trim() || !user) return;

    const newRoom: StudyRoom = {
      id: Date.now().toString(),
      name: newRoomName,
      topic: newRoomTopic,
      participants: [user.id],
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    const updatedRooms = [...studyRooms, newRoom];
    setStudyRooms(updatedRooms);
    localStorage.setItem('studyRooms', JSON.stringify(updatedRooms));
    
    setNewRoomName('');
    setNewRoomTopic('');
    setShowCreateForm(false);
  };

  const joinRoom = (roomId: string) => {
    if (!user) return;
    
    const updatedRooms = studyRooms.map(room => 
      room.id === roomId && !room.participants.includes(user.id)
        ? { ...room, participants: [...room.participants, user.id] }
        : room
    );
    
    setStudyRooms(updatedRooms);
    localStorage.setItem('studyRooms', JSON.stringify(updatedRooms));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LearnMate
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Plus className="h-4 w-4" />
                <span>Create Room</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 hover:bg-purple-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Study Rooms
          </h1>
          <p className="text-xl text-gray-600">
            Join or create study rooms to learn together
          </p>
        </div>

        {showCreateForm && (
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Create New Study Room</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Room name..."
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
              <Input
                placeholder="Topic to study..."
                value={newRoomTopic}
                onChange={(e) => setNewRoomTopic(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button onClick={createRoom} disabled={!newRoomName.trim() || !newRoomTopic.trim()}>
                  Create Room
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{room.name}</CardTitle>
                  <Badge variant={room.isActive ? 'default' : 'secondary'}>
                    {room.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Topic:</p>
                  <p className="font-medium">{room.topic}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {room.participants.length} participant{room.participants.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex space-x-2">
                  {room.participants.includes(user?.id || '') ? (
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Joined
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => joinRoom(room.id)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      Join Room
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {studyRooms.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No study rooms yet</p>
              <p className="text-gray-400">Create the first room to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyRoomsPage;
