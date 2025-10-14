import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { saveMoodEntry } from '../../services/wellness';

const MOOD_OPTIONS = [
  { level: 5, emoji: '😄', label: 'Excellent', color: 'from-green-400 to-green-600', icon: Sparkles },
  { level: 4, emoji: '🙂', label: 'Good', color: 'from-teal-400 to-teal-600', icon: Smile },
  { level: 3, emoji: '😐', label: 'Okay', color: 'from-yellow-400 to-yellow-600', icon: Meh },
  { level: 2, emoji: '😔', label: 'Not Great', color: 'from-orange-400 to-orange-600', icon: Frown },
  { level: 1, emoji: '😢', label: 'Struggling', color: 'from-red-400 to-red-600', icon: AlertCircle },
];

const EMOTIONS = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Anxious', emoji: '😰' },
  { name: 'Calm', emoji: '😌' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Grateful', emoji: '🙏' },
  { name: 'Energetic', emoji: '⚡' },
  { name: 'Tired', emoji: '😴' },
  { name: 'Hopeful', emoji: '🌟' },
  { name: 'Lonely', emoji: '💔' },
  { name: 'Peaceful', emoji: '🕊️' },
  { name: 'Stressed', emoji: '😓' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev =>
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSubmit = async () => {
    if (selectedMood === null) return;

    setIsSubmitting(true);

    try {
      const moodData = MOOD_OPTIONS.find(m => m.level === selectedMood);

      await saveMoodEntry({
        mood_level: selectedMood,
        mood_type: moodData?.label || '',
        emotions: selectedEmotions,
        note
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setSelectedMood(null);
        setSelectedEmotions([]);
        setNote('');
      }, 2000);
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            How are you feeling today?
          </h2>
          <p className="text-gray-600">
            Track your mood to understand your emotional patterns
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Choose your mood
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {MOOD_OPTIONS.map((mood) => (
                <motion.button
                  key={mood.level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.level)}
                  className={`p-4 rounded-2xl transition-all ${
                    selectedMood === mood.level
                      ? `bg-gradient-to-br ${mood.color} text-white shadow-lg`
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className={`text-sm font-medium ${
                    selectedMood === mood.level ? 'text-white' : 'text-gray-700'
                  }`}>
                    {mood.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  What emotions are you experiencing?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {EMOTIONS.map((emotion) => (
                    <button
                      key={emotion.name}
                      onClick={() => toggleEmotion(emotion.name)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedEmotions.includes(emotion.name)
                          ? 'bg-teal-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">{emotion.emoji}</span>
                      {emotion.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Add a note (optional)
                </h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's on your mind? How was your day?"
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Heart size={20} />
                    Save Mood Check-in
                  </>
                )}
              </button>
            </motion.div>
          )}

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-2">✅</div>
              <p className="text-green-800 font-semibold">
                Mood saved! Keep up the great work tracking your wellness.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MoodTracker;
