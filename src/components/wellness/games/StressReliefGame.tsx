import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';

const StressReliefGame = () => {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [score, setScore] = useState(0);

  const createBubble = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bubble = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 30 + 40,
    };

    setBubbles([...bubbles, bubble]);
  };

  const popBubble = (id: number) => {
    setBubbles(bubbles.filter(b => b.id !== id));
    setScore(score + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
          Stress Relief Bubble Pop
        </h2>
        <p className="text-gray-600 mb-4">
          Click anywhere to create bubbles, then pop them to release stress
        </p>
        <div className="inline-block bg-teal-100 px-6 py-3 rounded-full">
          <p className="text-teal-800 font-bold text-xl">
            Bubbles Popped: {score}
          </p>
        </div>
      </div>

      <div
        onClick={createBubble}
        className="relative w-full h-[500px] bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {bubbles.length === 0 && (
            <div className="text-center">
              <Smile size={64} className="text-teal-400 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">
                Click anywhere to start popping bubbles
              </p>
            </div>
          )}
        </div>

        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -20, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              popBubble(bubble.id);
            }}
            className="absolute cursor-pointer"
            style={{
              left: bubble.x - bubble.size / 2,
              top: bubble.y - bubble.size / 2,
              width: bubble.size,
              height: bubble.size,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0 }}
              className="w-full h-full rounded-full bg-gradient-to-br from-white/40 to-white/10 border-2 border-white/50 backdrop-blur-sm shadow-lg"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.5)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-white/60"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Why this helps:</h3>
        <p className="text-gray-600">
          This simple activity provides a satisfying sensory experience that can help redirect anxious thoughts
          and create a sense of control. The repetitive action can be meditative and calming.
        </p>
      </div>
    </div>
  );
};

export default StressReliefGame;
