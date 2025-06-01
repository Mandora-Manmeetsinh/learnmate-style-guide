
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import LearningStyle from "./pages/LearningStyle";
import TopicInput from "./pages/TopicInput";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import StudyRoomsPage from "./pages/StudyRoomsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning-style" element={<LearningStyle />} />
            <Route path="/topic-input" element={<TopicInput />} />
            <Route path="/result" element={<Result />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/study-rooms" element={<StudyRoomsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
