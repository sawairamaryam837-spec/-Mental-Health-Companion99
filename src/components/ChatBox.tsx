import { useRef, useEffect } from 'react';
import { marked } from 'marked';
import { Message, ChatType } from '../types';

interface ChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  chatType: ChatType;
}

const ChatBox = ({ messages, isLoading, chatType }: ChatBoxProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const renderMessageContent = (text: string, isBot: boolean, isError?: boolean) => {
    if (isBot) {
      return (
        <div
          className={`prose prose-sm max-w-none ${isError ? 'text-red-600' : 'text-gray-800'}`}
          dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
        />
      );
    }
    return <p className="text-gray-800">{text}</p>;
  };

  const isMentalHealth = chatType === 'mental-health';
  const bgGradient = isMentalHealth
    ? 'from-teal-400 to-teal-600'
    : 'from-orange-400 to-orange-600';

  const emoji = isMentalHealth ? '🌸' : '🕉️';
  const greeting = isMentalHealth
    ? "Hi, I'm ManoMitra"
    : "Namaste, I am GitaGPT";
  const description = isMentalHealth
    ? "How are you feeling today? I'm here to listen without judgment."
    : "I'm here to guide you with the eternal wisdom of the Bhagavad Gita. Share what weighs upon your heart.";

  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl">{emoji}</div>
            <h2 className={`text-2xl font-heading font-semibold ${isMentalHealth ? 'text-teal-600' : 'text-orange-600'}`}>
              {greeting}
            </h2>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.isBot
                ? message.isError
                  ? 'bg-red-50 text-red-800'
                  : 'bg-white shadow-md'
                : `bg-gradient-to-br ${bgGradient} text-white`
            }`}
          >
            {renderMessageContent(message.text, message.isBot, message.isError)}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
            <div className="flex space-x-2">
              <div className={`w-2 h-2 rounded-full animate-bounce ${isMentalHealth ? 'bg-teal-400' : 'bg-orange-400'}`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${isMentalHealth ? 'bg-teal-400' : 'bg-orange-400'}`} style={{ animationDelay: '300ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${isMentalHealth ? 'bg-teal-400' : 'bg-orange-400'}`} style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
