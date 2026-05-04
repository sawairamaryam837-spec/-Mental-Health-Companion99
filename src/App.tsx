import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import WellnessHub from './pages/WellnessHub';
import WellnessDashboard from './components/wellness/WellnessDashboard';
import MoodTracker from './components/wellness/MoodTracker';
import MeditationTimer from './components/wellness/MeditationTimer';
import BreathingExercise from './components/wellness/BreathingExercise';
import GratitudeJournal from './components/wellness/GratitudeJournal';
import QuranWisdomLibrary from './components/wellness/QuranWisdomLibrary';
import AffirmationGame from './components/wellness/games/AffirmationGame';
import StressReliefGame from './components/wellness/games/StressReliefGame';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/wellness" element={<WellnessHub />} />
        <Route path="/wellness/dashboard" element={<WellnessDashboard />} />
        <Route path="/wellness/mood" element={<MoodTracker />} />
        <Route path="/wellness/meditation" element={<MeditationTimer />} />
        <Route path="/wellness/breathing" element={<BreathingExercise />} />
        <Route path="/wellness/gratitude" element={<GratitudeJournal />} />
        <Route path="/wellness/gita" element={<QuranWisdomLibrary/>} />
        <Route path="/wellness/affirmations" element={<AffirmationGame />} />
        <Route path="/wellness/stress-relief" element={<StressReliefGame />} />
      </Routes>
    </Router>
  );
}

export default App;
