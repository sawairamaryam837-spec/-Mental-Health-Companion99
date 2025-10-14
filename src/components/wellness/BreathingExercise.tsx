import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Heart, Zap, Moon } from 'lucide-react';

const BREATHING_PATTERNS = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Calm your nervous system',
    icon: Heart,
    color: 'from-blue-400 to-blue-600',
    pattern: [
      { phase: 'Breathe In', duration: 4 },
      { phase: 'Hold', duration: 4 },
      { phase: 'Breathe Out', duration: 4 },
      { phase: 'Hold', duration: 4 },
    ]
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Reduce anxiety and improve sleep',
    icon: Moon,
    color: 'from-indigo-400 to-indigo-600',
    pattern: [
      { phase: 'Breathe In', duration: 4 },
      { phase: 'Hold', duration: 7 },
      { phase: 'Breathe Out', duration: 8 },
    ]
  },
  {
    id: 'energizing',
    name: 'Energizing Breath',
    description: 'Boost your energy',
    icon: Zap,
    color: 'from-orange-400 to-orange-600',
    pattern: [
      { phase: 'Breathe In', duration: 2 },
      { phase: 'Breathe Out', duration: 2 },
    ]
  },
  {
    id: 'deep',
    name: 'Deep Breathing',
    description: 'Relax and center yourself',
    icon: Wind,
    color: 'from-teal-400 to-teal-600',
    pattern: [
      { phase: 'Breathe In', duration: 5 },
      { phase: 'Hold', duration: 2 },
      { phase: 'Breathe Out', duration: 6 },
    ]
  },
];

const BreathingExercise = () => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const pattern = BREATHING_PATTERNS.find(p => p.id === selectedPattern);
  const currentPhase = pattern?.pattern[currentPhaseIndex];

  useEffect(() => {
    if (!isActive || !pattern) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const nextPhaseIndex = (currentPhaseIndex + 1) % pattern.pattern.length;

      if (nextPhaseIndex === 0) {
        setCompletedCycles(prev => prev + 1);
      }

      setCurrentPhaseIndex(nextPhaseIndex);
      setCountdown(pattern.pattern[nextPhaseIndex].duration);
    }
  }, [isActive, countdown, currentPhaseIndex, pattern]);

  const startExercise = (patternId: string) => {
    const selectedPattern = BREATHING_PATTERNS.find(p => p.id === patternId);
    if (!selectedPattern) return;

    setSelectedPattern(patternId);
    setIsActive(true);
    setCurrentPhaseIndex(0);
    setCountdown(selectedPattern.pattern[0].duration);
    setCompletedCycles(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedPattern(null);
    setCurrentPhaseIndex(0);
    setCountdown(0);
    setCompletedCycles(0);
  };

  const getCircleScale = () => {
    if (!currentPhase) return 1;

    if (currentPhase.phase.includes('In')) {
      return 1.5;
    } else if (currentPhase.phase.includes('Out')) {
      return 0.7;
    }
    return 1;
  };

  if (selectedPattern && pattern) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-white mb-2">
              {pattern.name}
            </h2>
            <p className="text-gray-400">
              {completedCycles} {completedCycles === 1 ? 'cycle' : 'cycles'} completed
            </p>
          </div>

          <div className="relative flex items-center justify-center mb-12" style={{ height: '400px' }}>
            <motion.div
              animate={{
                scale: getCircleScale(),
              }}
              transition={{
                duration: currentPhase?.duration || 4,
                ease: 'easeInOut',
              }}
              className={`w-64 h-64 rounded-full bg-gradient-to-br ${pattern.color} shadow-2xl flex items-center justify-center`}
            >
              <div className="text-center">
                <motion.div
                  key={currentPhase?.phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white"
                >
                  <p className="text-2xl font-semibold mb-2">
                    {currentPhase?.phase}
                  </p>
                  <p className="text-6xl font-bold">
                    {countdown}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: currentPhase?.duration || 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                className={`w-96 h-96 rounded-full bg-gradient-to-br ${pattern.color} opacity-20`}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={stopExercise}
              className="px-8 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition-all"
            >
              End Session
            </button>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-2">
            {pattern.pattern.map((phase, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-center transition-all ${
                  currentPhaseIndex === index
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <p className="text-xs mb-1">{phase.phase}</p>
                <p className="font-bold">{phase.duration}s</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Breathing Exercises
        </h2>
        <p className="text-gray-600">
          Find calm and balance through mindful breathing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BREATHING_PATTERNS.map((pattern) => (
          <motion.button
            key={pattern.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startExercise(pattern.id)}
            className={`bg-gradient-to-br ${pattern.color} text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-left`}
          >
            <pattern.icon size={48} className="mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-2">
              {pattern.name}
            </h3>
            <p className="text-white/90 mb-4">
              {pattern.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              {pattern.pattern.map((phase, index) => (
                <span key={index}>
                  {phase.duration}s {index < pattern.pattern.length - 1 && '→'}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BreathingExercise;
