
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  learningStyle?: string;
  xp: number;
  level: number;
  streak: number;
  lastLoginDate: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Topic {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  estimatedTime: number;
}

export interface UserProgress {
  userId: string;
  topicId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'revisit';
  completedAt?: string;
  quizScore?: number;
  timeSpent: number;
}

export interface Flashcard {
  id: string;
  topicId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  isFavorite: boolean;
}

export interface StudyRoom {
  id: string;
  name: string;
  topic: string;
  participants: string[];
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface Doubt {
  id: string;
  userId: string;
  topicId: string;
  question: string;
  answer?: string;
  createdAt: string;
  resolvedAt?: string;
}
