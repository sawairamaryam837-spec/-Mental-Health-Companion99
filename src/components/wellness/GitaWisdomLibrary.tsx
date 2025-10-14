import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Lightbulb, Target, Sparkles, Search } from 'lucide-react';

const GITA_TEACHINGS = [
  {
    id: 1,
    category: 'Stress & Anxiety',
    icon: Heart,
    color: 'from-blue-400 to-blue-600',
    verses: [
      {
        chapter: 2,
        verse: 47,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
        translation: 'You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
        meaning: 'Focus on your actions and efforts, not on the results. This reduces anxiety about outcomes.',
      },
      {
        chapter: 6,
        verse: 35,
        sanskrit: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्',
        translation: 'The mind is restless and difficult to control, but it can be controlled through practice and detachment.',
        meaning: 'Acknowledge that controlling your mind takes practice. Be patient with yourself.',
      },
    ],
  },
  {
    id: 2,
    category: 'Purpose & Direction',
    icon: Target,
    color: 'from-orange-400 to-orange-600',
    verses: [
      {
        chapter: 3,
        verse: 35,
        sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्',
        translation: 'It is better to perform one\'s own duties imperfectly than to master the duties of another.',
        meaning: 'Follow your own path and dharma rather than comparing yourself to others.',
      },
      {
        chapter: 18,
        verse: 48,
        sanskrit: 'सहजं कर्म कौन्तेय सदोषमपि न त्यजेत्',
        translation: 'One should not give up work born of one\'s nature, even if it has faults.',
        meaning: 'Embrace your unique calling and work with dedication despite imperfections.',
      },
    ],
  },
  {
    id: 3,
    category: 'Relationships',
    icon: Sparkles,
    color: 'from-pink-400 to-pink-600',
    verses: [
      {
        chapter: 12,
        verse: 13,
        sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च',
        translation: 'One who is not envious but is a kind friend to all beings is very dear to Me.',
        meaning: 'Cultivate compassion and friendship toward all, without jealousy or hatred.',
      },
      {
        chapter: 5,
        verse: 18,
        sanskrit: 'विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि',
        translation: 'The wise see with equal vision a learned scholar, a cow, an elephant, a dog, and an outcaste.',
        meaning: 'Look beyond external differences and see the divine essence in everyone.',
      },
    ],
  },
  {
    id: 4,
    category: 'Self-Knowledge',
    icon: Lightbulb,
    color: 'from-purple-400 to-purple-600',
    verses: [
      {
        chapter: 2,
        verse: 20,
        sanskrit: 'न जायते म्रियते वा कदाचिन्',
        translation: 'The soul is never born and never dies; it is eternal, indestructible, and timeless.',
        meaning: 'You are not just your body or mind. Your true self is eternal and unchanging.',
      },
      {
        chapter: 6,
        verse: 5,
        sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्',
        translation: 'Elevate yourself through the power of your mind, and not degrade yourself.',
        meaning: 'You have the power to uplift or diminish yourself through your thoughts.',
      },
    ],
  },
  {
    id: 5,
    category: 'Peace & Balance',
    icon: BookOpen,
    color: 'from-teal-400 to-teal-600',
    verses: [
      {
        chapter: 2,
        verse: 48,
        sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय',
        translation: 'Perform your duty equipoised, abandoning all attachment to success or failure.',
        meaning: 'Maintain balance and equanimity in all circumstances, success or failure.',
      },
      {
        chapter: 6,
        verse: 17,
        sanskrit: 'युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु',
        translation: 'Those who are moderate in eating, sleeping, working, and recreation attain peace.',
        meaning: 'Balance in daily habits is essential for mental peace and spiritual growth.',
      },
    ],
  },
];

const GitaWisdomLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedTeaching = GITA_TEACHINGS.find(t => t.id === selectedCategory);

  const filteredTeachings = searchTerm
    ? GITA_TEACHINGS.filter(t =>
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.verses.some(v =>
          v.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.meaning.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : GITA_TEACHINGS;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🕉️</div>
        <h2 className="text-4xl font-heading font-bold text-gray-900 mb-2">
          Bhagavad Gita Wisdom Library
        </h2>
        <p className="text-gray-600 mb-6">
          Timeless teachings for modern life challenges
        </p>

        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search wisdom..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachings.map((teaching, index) => (
            <motion.button
              key={teaching.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(teaching.id)}
              className={`bg-gradient-to-br ${teaching.color} text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-left`}
            >
              <teaching.icon size={48} className="mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">
                {teaching.category}
              </h3>
              <p className="text-white/90 text-sm">
                {teaching.verses.length} verses
              </p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all"
          >
            ← Back to Categories
          </button>

          <div className={`bg-gradient-to-br ${selectedTeaching?.color} text-white rounded-3xl p-8 mb-8 shadow-xl`}>
            <selectedTeaching.icon size={48} className="mb-4" />
            <h2 className="text-4xl font-heading font-bold mb-2">
              {selectedTeaching?.category}
            </h2>
            <p className="text-white/90">
              Wisdom from the Bhagavad Gita
            </p>
          </div>

          <div className="space-y-6">
            {selectedTeaching?.verses.map((verse, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`bg-gradient-to-r ${selectedTeaching.color} text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                    Chapter {verse.chapter}, Verse {verse.verse}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-2xl text-gray-800 font-serif italic mb-2">
                    {verse.sanskrit}
                  </p>
                </div>

                <div className="mb-6 p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Translation:</h4>
                  <p className="text-gray-800 leading-relaxed">
                    "{verse.translation}"
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Meaning for You:</h4>
                  <p className="text-gray-800 leading-relaxed">
                    {verse.meaning}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitaWisdomLibrary;
