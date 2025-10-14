import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import { saveMeditationSession } from '../../services/wellness';

const MEDITATION_TYPES = [
  { id: 'mindfulness', name: 'Mindfulness', duration: 10, color: 'from-teal-400 to-teal-600', emoji: '🧘' },
  { id: 'breathing', name: 'Breathing', duration: 5, color: 'from-blue-400 to-blue-600', emoji: '💨' },
  { id: 'body-scan', name: 'Body Scan', duration: 15, color: 'from-purple-400 to-purple-600', emoji: '✨' },
  { id: 'loving-kindness', name: 'Loving Kindness', duration: 10, color: 'from-pink-400 to-pink-600', emoji: '💗' },
  { id: 'sleep', name: 'Sleep Meditation', duration: 20, color: 'from-indigo-400 to-indigo-600', emoji: '🌙' },
];

interface MeditationTimerProps {
  onClose?: () => void;
}

const MeditationTimer = ({ onClose }: MeditationTimerProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedMeditation = MEDITATION_TYPES.find(m => m.id === selectedType);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startMeditation = (type: string, duration: number) => {
    setSelectedType(type);
    setTimeLeft(duration * 60);
    setTotalTime(duration * 60);
    setIsRunning(true);
    setIsComplete(false);
  };

  const togglePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const handleComplete = async () => {
    setIsRunning(false);
    setIsComplete(true);

    if (selectedType) {
      try {
        await saveMeditationSession({
          session_type: selectedType,
          duration: totalTime,
          completed: true
        });
      } catch (error) {
        console.error('Error saving meditation session:', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-8xl mb-6"
        >
          ✨
        </motion.div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Session Complete!
        </h2>
        <p className="text-gray-600 mb-8">
          Wonderful work! You've completed your {selectedMeditation?.name} meditation.
          Keep nurturing your inner peace.
        </p>
        <button
          onClick={() => {
            setIsComplete(false);
            setSelectedType(null);
            setTimeLeft(0);
            setTotalTime(0);
          }}
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-xl transition-all"
        >
          Start Another Session
        </button>
      </motion.div>
    );
  }

  if (selectedType) {
    return (
      <div className="max-w-md mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 text-center"
        >
          <div className="text-6xl mb-4">{selectedMeditation?.emoji}</div>
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            {selectedMeditation?.name}
          </h3>

          <div className="my-8">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '552.92', strokeDashoffset: '552.92' }}
                  animate={{
                    strokeDashoffset: 552.92 - (552.92 * progress) / 100
                  }}
                  transition={{ duration: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-900">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={togglePause}
              className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:shadow-xl transition-all"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={handleReset}
              className="p-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all"
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={handleComplete}
              className="p-4 bg-green-500 text-white rounded-full hover:shadow-xl transition-all"
            >
              <Check size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Choose Your Meditation
        </h2>
        <p className="text-gray-600">
          Find peace and clarity through guided meditation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MEDITATION_TYPES.map((meditation) => (
          <motion.button
            key={meditation.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startMeditation(meditation.id, meditation.duration)}
            className={`bg-gradient-to-br ${meditation.color} text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-left`}
          >
            <div className="text-5xl mb-4">{meditation.emoji}</div>
            <h3 className="text-2xl font-heading font-bold mb-2">
              {meditation.name}
            </h3>
            <p className="text-white/90 mb-4">
              {meditation.duration} minutes
            </p>
            <div className="flex items-center gap-2 text-white/90">
              <Play size={16} />
              <span className="text-sm">Start Session</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MeditationTimer;
