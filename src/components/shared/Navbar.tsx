import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageCircle, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🌸</span>
            <span className="text-2xl font-heading font-bold text-teal-600">ManoMitra</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => navigate('/wellness')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium flex items-center gap-1"
            >
              <Heart size={18} />
              Wellness Hub
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Start Chatting
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => {
                  navigate('/wellness');
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
              >
                Wellness Hub
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => {
                  navigate('/chat');
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Start Chatting
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
