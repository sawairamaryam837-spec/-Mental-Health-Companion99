import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

const testimonials = [
  {
    name: 'Ankita Kumari Singh',
    role: 'College Student',
    text: 'ManoMitra really helped me during exam stress. Talking to it late at night when I felt anxious gave me a sense of calm and support, like a caring friend who actually understands.',
    rating: 5,
  },
  {
    name: 'Priyanshu Vishwakarma',
    role: 'Software Engineer',
    text: 'Working in tech can get overwhelming sometimes. ManoMitra helps me clear my thoughts and reminds me to slow down and breathe. It feels like having a thoughtful companion who truly listens.',
    rating: 5,
  },
  {
    name: 'Anjali Yadav',
    role: 'Professor',
    text: 'At first, I didn’t expect much from an AI chat, but ManoMitra surprised me. The responses feel warm and understanding — it has genuinely helped me manage my emotions better.',
    rating: 5,
  },
  {
    name: 'Shambhavi Shukla',
    role: 'Entrepreneur',
    text: 'Running my business can get really stressful. ManoMitra gives me a safe and non-judgmental space to express myself. It’s like having a peaceful conversation that helps me regain focus.',
    rating: 5,
  },
];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from people who found support
          </p>
        </motion.div>

        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-3xl mx-auto">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="text-amber-500 fill-current" size={24} />
                  ))}
                </div>
                <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-teal-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
