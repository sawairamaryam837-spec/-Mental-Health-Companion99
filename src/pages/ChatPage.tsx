import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import { ChatType } from '../types';

const ChatPage = () => {
  const [chatType, setChatType] = useState<ChatType>('mental-health');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{chatType === 'mental-health' ? '🌸' : '📖🤍'}</span>
              <h1 className={`text-2xl font-heading font-semibold ${chatType === 'mental-health' ? 'text-teal-600' : 'text-orange-600'}`}>
                {chatType === 'mental-health' ? 'Mental Health Companion' : 'QuranGPT'}
              </h1>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setChatType('mental-health')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                chatType === 'mental-health'
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🌸</span>
                <span>Mental Health Support</span>
              </div>
            </button>
            <button
              onClick={() => setChatType('QuranGPT')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                chatType === 'QuranGPT'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📖🤍</span>
                <span>Spiritual Guidance</span>
              </div>
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <ChatBot chatType={chatType} />
      </div>
    </div>
  );
};

export default ChatPage;
