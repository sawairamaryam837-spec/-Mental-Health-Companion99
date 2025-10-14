import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Sparkles } from 'lucide-react';
import { saveGratitudeEntry, getGratitudeEntries } from '../../services/wellness';
import { GratitudeEntry } from '../../services/supabase';

const PROMPTS = [
  'What made you smile today?',
  'Who are you grateful for and why?',
  'What small thing brought you joy?',
  'What challenge helped you grow?',
  'What do you appreciate about yourself?',
  'What simple pleasure did you enjoy?',
];

const GratitudeJournal = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadEntries();
    setCurrentPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getGratitudeEntries(20);
      setEntries(data || []);
    } catch (error) {
      console.error('Error loading gratitude entries:', error);
    }
  };

  const handleSubmit = async () => {
    if (!newEntry.trim()) return;

    setIsSubmitting(true);

    try {
      await saveGratitudeEntry(newEntry);
      setNewEntry('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      loadEntries();
      setCurrentPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    } catch (error) {
      console.error('Error saving gratitude entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl shadow-xl p-8 mb-8"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Gratitude Journal
          </h2>
          <p className="text-gray-600">
            Cultivate joy by celebrating life's blessings
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <p className="text-lg text-gray-700 mb-4 font-medium">
            💭 {currentPrompt}
          </p>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write what you're grateful for..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows={4}
          />
          <button
            onClick={handleSubmit}
            disabled={!newEntry.trim() || isSubmitting}
            className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus size={20} />
                Add to Journal
              </>
            )}
          </button>
        </div>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6"
          >
            <Sparkles className="inline text-green-600 mr-2" size={20} />
            <span className="text-green-800 font-semibold">
              Entry added! Your gratitude practice is growing.
            </span>
          </motion.div>
        )}
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
          Your Gratitude Collection
        </h3>

        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-gray-500">
              Start your gratitude journey by adding your first entry above
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-3">
                  <Heart className="text-pink-500 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed mb-2">
                      {entry.entry}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(entry.created_at!)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
