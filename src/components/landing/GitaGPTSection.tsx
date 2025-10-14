import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart, Flower2 } from 'lucide-react';

const GitaGPTSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-orange-300 opacity-20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-6xl">🕉️</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">GitaGPT</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ancient wisdom meets modern AI. Get spiritual guidance from the Bhagavad Gita to navigate life's challenges with clarity and inner peace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              title: 'Timeless Wisdom',
              description: 'Teachings from the Bhagavad Gita applied to your modern life challenges',
              color: 'from-orange-400 to-orange-600',
            },
            {
              icon: Flower2,
              title: 'Spiritual Guidance',
              description: 'Find purpose, clarity, and inner peace through dharmic principles',
              color: 'from-orange-500 to-orange-700',
            },
            {
              icon: Heart,
              title: 'Compassionate Support',
              description: 'Non-judgmental guidance rooted in compassion and understanding',
              color: 'from-orange-600 to-orange-800',
            },
            {
              icon: Sparkles,
              title: 'Practical Application',
              description: 'Ancient philosophy made accessible and actionable for today',
              color: 'from-orange-400 to-orange-700',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-orange-200"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-heading font-bold mb-4">
                What GitaGPT Can Help You With
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">✨</span>
                  <div>
                    <h4 className="font-semibold mb-1">Life Purpose & Direction</h4>
                    <p className="text-orange-100 text-sm">Discover your dharma and life's calling</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">🧘</span>
                  <div>
                    <h4 className="font-semibold mb-1">Stress & Anxiety</h4>
                    <p className="text-orange-100 text-sm">Find peace through detachment and surrender</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">⚖️</span>
                  <div>
                    <h4 className="font-semibold mb-1">Difficult Decisions</h4>
                    <p className="text-orange-100 text-sm">Navigate choices with wisdom and clarity</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl mt-1">💫</span>
                  <div>
                    <h4 className="font-semibold mb-1">Personal Growth</h4>
                    <p className="text-orange-100 text-sm">Transform through self-realization</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <blockquote className="text-lg italic mb-4">
                "You have the right to perform your duties, but you are not entitled to the fruits of your actions."
              </blockquote>
              <p className="text-orange-100 text-sm">
                — Bhagavad Gita 2.47
              </p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-orange-100">
                  GitaGPT helps you understand and apply such timeless wisdom to your everyday challenges, providing spiritual support that complements your mental wellness journey.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitaGPTSection;
