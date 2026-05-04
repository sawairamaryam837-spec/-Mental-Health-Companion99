import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowDown } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-teal-50 to-white">
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-teal-300 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-8xl mb-6"
          >
            🌸
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 mb-6">
            Your Safe Space for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-500">
              Mental & Spiritual Wellness
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered support combining compassionate mental health care with ancient wisdom from the Quran.
            Available 24/7 whenever you need guidance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate('/chat')}
            className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-lg font-semibold hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle size={24} />
            Start Your Journey Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="px-8 py-4 bg-white text-gray-700 rounded-full text-lg font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-gray-200"
          >
            Learn About QuranGPT and Friend of the Mind
            <ArrowDown size={20} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: '🕐', label: '24/7 Available', desc: 'Always here when you need us' },
            { icon: '💬', label: '10k+ Conversations', desc: 'Trusted by thousands' },
            { icon: '🔒', label: '100% Confidential', desc: 'Your privacy matters' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
              <p className="text-sm text-gray-600">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
