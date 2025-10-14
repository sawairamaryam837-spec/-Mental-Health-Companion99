import { motion } from 'framer-motion';
import { Shield, Clock, Brain, Users, Smile, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are confidential. We prioritize your privacy and data security.',
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'Day or night, whenever you need support, ManoMitra is here for you.',
    },
    {
      icon: Brain,
      title: 'Intelligent Support',
      description: 'AI-powered responses that understand context and provide meaningful guidance.',
    },
    {
      icon: Users,
      title: 'Non-Judgmental',
      description: 'Share freely without fear of criticism or judgment. This is your safe space.',
    },
    {
      icon: Smile,
      title: 'Empathetic Care',
      description: 'Compassionate responses designed to validate your feelings and experiences.',
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Get immediate support when you need it most. No waiting, no appointments.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Why Choose ManoMitra?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mental wellness support designed with you in mind
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-teal-200"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
