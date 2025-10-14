import { Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌸</span>
              <h3 className="text-2xl font-heading font-bold text-white">
                ManoMitra
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your compassionate companion for mental wellness. Available 24/7
              to listen, support, and care.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/chat"
                  className="hover:text-teal-400 transition-colors"
                >
                  Start Chatting
                </a>
              </li>
              <li>
                <a
                  href="/wellness"
                  className="hover:text-teal-400 transition-colors"
                >
                  Wellness Hub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Crisis Resources
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">
                    National Crisis Hotline
                  </p>
                  <p className="text-sm text-gray-400">988 (24/7)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Crisis Text Line</p>
                  <p className="text-sm text-gray-400">Text HOME to 741741</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              Made with{" "}
              <Heart size={16} className="inline text-red-500 fill-current" />{" "}
              by{" "}
              <a
                href="https://www.linkedin.com/in/priyanshu-vishwakarmaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Priyanshu Vishwakarma
              </a>{" "}
              and team Visioneers
            </p>
            <p className="text-sm text-gray-400">
              © 2025 ManoMitra. All rights reserved.
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> ManoMitra provides emotional support
              and is not a substitute for professional medical advice,
              diagnosis, or treatment. If you are experiencing a mental health
              crisis, please contact emergency services or a qualified mental
              health professional immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
