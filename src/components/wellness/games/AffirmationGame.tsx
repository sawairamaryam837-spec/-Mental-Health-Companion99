import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart } from 'lucide-react';

const AFFIRMATIONS = [
  { text: 'I am worthy of love and respect', category: 'Self-Worth', color: 'from-pink-400 to-pink-600' },
  { text: 'I choose peace over worry', category: 'Peace', color: 'from-blue-400 to-blue-600' },
  { text: 'I am stronger than my challenges', category: 'Strength', color: 'from-orange-400 to-orange-600' },
  { text: 'I trust in my journey', category: 'Trust', color: 'from-teal-400 to-teal-600' },
  { text: 'I am enough exactly as I am', category: 'Self-Acceptance', color: 'from-purple-400 to-purple-600' },
  { text: 'I release what I cannot control', category: 'Letting Go', color: 'from-indigo-400 to-indigo-600' },
  { text: 'My mind is calm and clear', category: 'Clarity', color: 'from-cyan-400 to-cyan-600' },
  { text: 'I am growing and evolving every day', category: 'Growth', color: 'from-green-400 to-green-600' },
  { text: 'I deserve happiness and joy', category: 'Joy', color: 'from-yellow-400 to-yellow-600' },
  { text: 'I am grateful for this moment', category: 'Gratitude', color: 'from-rose-400 to-rose-600' },
];

const AffirmationGame = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(AFFIRMATIONS[0]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    setCurrentAffirmation(AFFIRMATIONS[randomIndex]);
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentAffirmation.text)) {
      setFavorites(favorites.filter(a => a !== currentAffirmation.text));
    } else {
      setFavorites([...favorites, currentAffirmation.text]);
    }
  };

  const isFavorite = favorites.includes(currentAffirmation.text);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Daily Affirmations
        </h2>
        <p className="text-gray-600">
          Nurture positive thoughts and self-belief
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentAffirmation.text}
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${currentAffirmation.color} rounded-3xl shadow-2xl p-12 text-center text-white mb-8`}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="text-6xl mb-6"
          >
            ✨
          </motion.div>

          <p className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-relaxed">
            {currentAffirmation.text}
          </p>

          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-sm font-semibold">{currentAffirmation.category}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={getRandomAffirmation}
          className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          New Affirmation
        </button>

        <button
          onClick={toggleFavorite}
          className={`px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${
            isFavorite
              ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-300'
          }`}
        >
          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      {favorites.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="text-pink-500" size={24} />
            Your Favorite Affirmations
          </h3>
          <div className="space-y-3">
            {favorites.map((affirmation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl"
              >
                <p className="text-gray-800 font-medium">{affirmation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AffirmationGame;
