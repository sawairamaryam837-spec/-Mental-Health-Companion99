import { motion } from 'framer-motion';
import { Shield, Clock, Brain, Users, BookOpen, Sparkles } from 'lucide-react';

const DualFeatures = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Two Paths to Wellness
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the support that resonates with you - or explore both
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🌸</span>
              <h3 className="text-3xl font-heading font-bold text-teal-700">ManoMitra Chat</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Modern mental health support with evidence-based techniques
            </p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Private & Confidential', desc: 'Your conversations stay secure' },
                { icon: Clock, title: 'Available 24/7', desc: 'Support whenever you need it' },
                { icon: Brain, title: 'Evidence-Based', desc: 'Proven coping strategies & techniques' },
                { icon: Users, title: 'Non-Judgmental', desc: 'Safe space to express yourself' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🕉️</span>
              <h3 className="text-3xl font-heading font-bold text-orange-700">GitaGPT</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Ancient wisdom from the Bhagavad Gita for modern challenges
            </p>
            <div className="space-y-4">
              {[
                { icon: BookOpen, title: 'Timeless Teachings', desc: 'Wisdom that transcends time' },
                { icon: Sparkles, title: 'Spiritual Guidance', desc: 'Find purpose and meaning' },
                { icon: Brain, title: 'Practical Philosophy', desc: 'Ancient wisdom for today' },
                { icon: Users, title: 'Universal Truth', desc: 'Applicable to all seekers' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DualFeatures;
