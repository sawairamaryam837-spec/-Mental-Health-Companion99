import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles } from 'lucide-react';

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-teal-500 via-teal-600 to-orange-600 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-6">🌸</div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl md:text-2xl text-teal-50 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you seek mental wellness support or spiritual guidance, we're here for you.
            Start a conversation today.
          </p>

          <motion.button
            onClick={() => navigate('/chat')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 bg-white text-teal-600 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
          >
            <MessageCircle size={28} />
            Start Chatting Now
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          </motion.button>

          <p className="mt-8 text-teal-100 text-sm">
            Free • Confidential • Available 24/7
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
