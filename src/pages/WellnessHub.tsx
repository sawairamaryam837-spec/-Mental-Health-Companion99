import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  TrendingUp,
  Wind,
  Sparkles,
  BookOpen,
  Smile,
  Target,
  Home,
  MessageCircle,
} from 'lucide-react';

const WELLNESS_FEATURES = [
  {
    id: 'dashboard',
    name: 'Wellness Dashboard',
    description: 'Track your progress and celebrate achievements',
    icon: TrendingUp,
    color: 'from-teal-400 to-teal-600',
    path: '/wellness/dashboard',
  },
  {
    id: 'mood',
    name: 'Mood Tracker',
    description: 'Log and understand your emotional patterns',
    icon: Heart,
    color: 'from-pink-400 to-pink-600',
    path: '/wellness/mood',
  },
  {
    id: 'meditation',
    name: 'Meditation Timer',
    description: 'Guided meditation sessions for peace',
    icon: Sparkles,
    color: 'from-purple-400 to-purple-600',
    path: '/wellness/meditation',
  },
  {
    id: 'breathing',
    name: 'Breathing Exercises',
    description: 'Calm your mind with breathing techniques',
    icon: Wind,
    color: 'from-blue-400 to-blue-600',
    path: '/wellness/breathing',
  },
  {
    id: 'gratitude',
    name: 'Gratitude Journal',
    description: 'Cultivate joy through daily gratitude',
    icon: Target,
    color: 'from-orange-400 to-orange-600',
    path: '/wellness/gratitude',
  },
  {
    id: 'Quran',
    name: ' Quran Wisdom Library',
    description: 'Ancient wisdom for modern challenges',
    icon: BookOpen,
    color: 'from-orange-500 to-orange-700',
    path: '/wellness/gita',
  },
  {
    id: 'affirmations',
    name: 'Daily Affirmations',
    description: 'Positive thoughts for self-belief',
    icon: Sparkles,
    color: 'from-yellow-400 to-yellow-600',
    path: '/wellness/affirmations',
  },
  {
    id: 'stress-relief',
    name: 'Stress Relief Games',
    description: 'Interactive activities to ease anxiety',
    icon: Smile,
    color: 'from-green-400 to-green-600',
    path: '/wellness/stress-relief',
  },
];

const WellnessHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="text-7xl mb-4">🌸</div>
              <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
                Wellness Hub
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your complete toolkit for mental wellness and spiritual growth
              </p>
            </motion.div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-gray-700 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200"
          >
            <Home size={20} />
            Home
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Chat Support
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WELLNESS_FEATURES.map((feature, index) => (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(feature.path)}
              className={`bg-gradient-to-br ${feature.color} text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-left group`}
            >
              <feature.icon size={48} className="mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-heading font-bold mb-2">
                {feature.name}
              </h3>
              <p className="text-white/90 text-sm">
                {feature.description}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Your Wellness Journey Awaits
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Explore these interactive features designed to support your mental health and spiritual growth.
            Each tool is crafted with care to help you find balance, peace, and clarity.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-teal-50 px-6 py-3 rounded-full">
              <span className="text-teal-700 font-semibold">🎯 Track Progress</span>
            </div>
            <div className="bg-pink-50 px-6 py-3 rounded-full">
              <span className="text-pink-700 font-semibold">🏆 Earn Badges</span>
            </div>
            <div className="bg-orange-50 px-6 py-3 rounded-full">
              <span className="text-orange-700 font-semibold">🌱 Grow Daily</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WellnessHub;
