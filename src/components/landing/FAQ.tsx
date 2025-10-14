import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's the difference between ManoMitra and GitaGPT?",
      answer:
        "ManoMitra provides modern, evidence-based mental health support with practical coping strategies. GitaGPT offers spiritual guidance rooted in the Bhagavad Gita's ancient wisdom. Both complement each other beautifully - use whichever resonates with you, or explore both!",
    },
    {
      question: "Is this a replacement for professional therapy?",
      answer:
        "No. Both chatbots provide support and guidance, but they're not substitutes for professional mental health care. For severe or ongoing mental health issues, please consult a licensed therapist or counselor.",
    },
    {
      question: "How is my privacy protected?",
      answer:
        "We take your privacy seriously. Your conversations are confidential and encrypted. We do not store personal information or share your data with third parties.",
    },
    {
      question: "Is this service free?",
      answer:
        "Yes, both ManoMitra and GitaGPT are currently free to use. We believe mental and spiritual wellness support should be accessible to everyone who needs it.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our platform
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-teal-200 transition-colors shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className="text-teal-500 flex-shrink-0"
                    size={24}
                  />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
