import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Flame, Target, Calendar, Sparkles } from 'lucide-react';
import { getUserProgress, getMoodHistory, calculateStreak } from '../../services/wellness';
import { UserProgress, MoodEntry } from '../../services/supabase';

const WellnessDashboard = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [progressData, moodHistory, streakData] = await Promise.all([
        getUserProgress(),
        getMoodHistory(30),
        calculateStreak()
      ]);

      setProgress(progressData);
      setMoodData(moodHistory || []);
      setStreak(streakData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const calculateAverageMood = () => {
    if (moodData.length === 0) return 0;
    const sum = moodData.reduce((acc, entry) => acc + entry.mood_level, 0);
    return (sum / moodData.length).toFixed(1);
  };

  const getXPForNextLevel = () => {
    if (!progress) return 100;
    return progress.level * 100;
  };

  const getCurrentLevelXP = () => {
    if (!progress) return 0;
    return progress.experience_points % 100;
  };

  const BADGES = [
    { id: 'first_checkin', name: 'First Step', emoji: '👣', requirement: 'Complete first check-in' },
    { id: 'week_streak', name: 'Week Warrior', emoji: '🔥', requirement: '7 day streak' },
    { id: 'meditation_master', name: 'Meditation Master', emoji: '🧘', requirement: '10 meditation sessions' },
    { id: 'gratitude_guru', name: 'Gratitude Guru', emoji: '🙏', requirement: '20 gratitude entries' },
    { id: 'month_streak', name: 'Monthly Commitment', emoji: '⭐', requirement: '30 day streak' },
  ];

  if (!progress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
          Your Wellness Journey
        </h1>
        <p className="text-gray-600">
          Track your progress and celebrate your growth
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 text-white shadow-lg"
        >
          <Flame size={32} className="mb-2" />
          <p className="text-white/80 text-sm mb-1">Current Streak</p>
          <p className="text-4xl font-bold">{streak.currentStreak}</p>
          <p className="text-sm text-white/80 mt-2">days in a row</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl p-6 text-white shadow-lg"
        >
          <TrendingUp size={32} className="mb-2" />
          <p className="text-white/80 text-sm mb-1">Average Mood</p>
          <p className="text-4xl font-bold">{calculateAverageMood()}</p>
          <p className="text-sm text-white/80 mt-2">last 30 days</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 text-white shadow-lg"
        >
          <Target size={32} className="mb-2" />
          <p className="text-white/80 text-sm mb-1">Meditations</p>
          <p className="text-4xl font-bold">{progress.total_meditations}</p>
          <p className="text-sm text-white/80 mt-2">completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl p-6 text-white shadow-lg"
        >
          <Calendar size={32} className="mb-2" />
          <p className="text-white/80 text-sm mb-1">Check-ins</p>
          <p className="text-4xl font-bold">{progress.total_check_ins}</p>
          <p className="text-sm text-white/80 mt-2">mood entries</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-teal-500" size={28} />
            <div>
              <h3 className="text-2xl font-heading font-bold text-gray-900">
                Level {progress.level}
              </h3>
              <p className="text-gray-600 text-sm">Wellness Explorer</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{getCurrentLevelXP()} XP</span>
              <span>{getXPForNextLevel()} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(getCurrentLevelXP() / getXPForNextLevel()) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
              />
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            Keep up the great work! Complete activities to earn XP and level up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-orange-500" size={28} />
            <h3 className="text-2xl font-heading font-bold text-gray-900">
              Achievements
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {BADGES.map((badge) => {
              const isEarned = progress.badges?.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`text-center p-4 rounded-2xl transition-all ${
                    isEarned
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100'
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className={`text-4xl mb-2 ${isEarned ? 'filter-none' : 'grayscale'}`}>
                    {badge.emoji}
                  </div>
                  <p className={`text-xs font-semibold ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-lg"
      >
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">
          Mood Trends (Last 7 Days)
        </h3>

        <div className="flex items-end justify-between gap-2 h-48">
          {moodData.slice(0, 7).reverse().map((entry, index) => {
            const date = new Date(entry.created_at!);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const height = (entry.mood_level / 5) * 100;

            return (
              <div key={entry.id} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t-lg min-h-[20px]"
                />
                <p className="text-xs text-gray-600 mt-2">{dayName}</p>
                <p className="text-2xl">{['😢', '😔', '😐', '🙂', '😄'][entry.mood_level - 1]}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default WellnessDashboard;
