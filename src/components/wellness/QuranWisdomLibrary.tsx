import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Lightbulb, Target, Sparkles, Search } from 'lucide-react';

const QURAN_TEACHINGS = [
  {
    id: 1,
    category: 'Stress & Anxiety',
    icon: Heart,
    color: 'from-green-400 to-green-600',
    verses: [
      {
        surah: 13,
        ayah: 28,
        arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        translation: 'Indeed, in the remembrance of Allah do hearts find rest.',
        meaning: 'When you feel anxious, remember Allah. It brings inner peace.',
      },
      {
        surah: 2,
        ayah: 286,
        arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
        translation: 'Allah does not burden a soul beyond that it can bear.',
        meaning: 'You are strong enough to handle every test.',
      },
    ],
  },
  {
    id: 2,
    category: 'Purpose & Direction',
    icon: Target,
    color: 'from-emerald-400 to-emerald-600',
    verses: [
      {
        surah: 51,
        ayah: 56,
        arabic: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
        translation: 'I created jinn and mankind only to worship Me.',
        meaning: 'Your purpose is to live a meaningful life with faith.',
      },
      {
        surah: 94,
        ayah: 5,
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translation: 'Indeed, with hardship comes ease.',
        meaning: 'Every difficulty is followed by relief.',
      },
    ],
  },
  {
    id: 3,
    category: 'Relationships',
    icon: Sparkles,
    color: 'from-teal-400 to-teal-600',
    verses: [
      {
        surah: 49,
        ayah: 13,
        arabic: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
        translation: 'The most honorable among you is the most righteous.',
        meaning: 'Respect people based on character.',
      },
      {
        surah: 24,
        ayah: 22,
        arabic: 'وَلْيَعْفُوا وَلْيَصْفَحُوا',
        translation: 'Let them forgive and overlook.',
        meaning: 'Forgiveness strengthens relationships.',
      },
    ],
  },
  {
    id: 4,
    category: 'Self-Reflection',
    icon: Lightbulb,
    color: 'from-lime-400 to-lime-600',
    verses: [
      {
        surah: 91,
        ayah: 9,
        arabic: 'قَدْ أَفْلَحَ مَن زَكَّاهَا',
        translation: 'Successful is the one who purifies the soul.',
        meaning: 'Work on your inner self.',
      },
    ],
  },
  {
    id: 5,
    category: 'Peace & Patience',
    icon: BookOpen,
    color: 'from-green-500 to-green-700',
    verses: [
      {
        surah: 2,
        ayah: 153,
        arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        translation: 'Allah is with the patient.',
        meaning: 'Be patient in hardships.',
      },
    ],
  },
];

export default function QuranWisdomLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedTeaching = QURAN_TEACHINGS.find(
    (t) => t.id === selectedCategory
  );

  const filteredTeachings = QURAN_TEACHINGS.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">☪️</div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Quran Wisdom Library
        </h2>
        <p className="text-gray-600 mb-6">
          Guidance from the Quran for everyday life
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guidance..."
            className="w-full pl-12 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Categories */}
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachings.map((teaching, index) => (
            <motion.button
              key={teaching.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(teaching.id)}
              className={`bg-gradient-to-br ${teaching.color} text-white p-6 rounded-2xl shadow-lg text-left`}
            >
              <teaching.icon size={40} className="mb-3" />
              <h3 className="text-xl font-bold">{teaching.category}</h3>
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-6 py-2 bg-gray-200 rounded-full"
          >
            ← Back
          </motion.button>

          {/* Verses */}
          <div className="space-y-6">
            {selectedTeaching?.verses.map((verse, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <p className="text-2xl mb-2">{verse.arabic}</p>
                <p className="text-gray-600 mb-2">"{verse.translation}"</p>
                <p className="text-sm text-gray-500">{verse.meaning}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}