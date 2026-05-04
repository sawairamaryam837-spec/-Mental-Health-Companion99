import { useState, useEffect } from 'react';
import { Message, ChatType } from '../types';
import ChatBox from './ChatBox';
import InputArea from './InputArea';
import { generateResponse } from '../services/ai';
import { generateQuranResponse } from '../services/QuranGPT';

const STORAGE_KEY_MENTAL = 'manomitra-chat-history';
const STORAGE_KEY_QURAN = 'qurangpt-chat-history';

interface ChatBotProps {
  chatType: ChatType;
}

const ChatBot = ({ chatType }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const storageKey = chatType === 'mental-health' ? STORAGE_KEY_MENTAL : STORAGE_KEY_QURAN;

  useEffect(() => {
    const savedMessages = localStorage.getItem(storageKey);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseText = chatType === 'mental-health'
        ? await generateResponse(text)
        : await generateQuranResponse(text);

      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I apologize, but I encountered an issue. Please try sending your message again in a moment.",
        isBot: true,
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-cream via-white to-teal-50">
      <ChatBox messages={messages} isLoading={isLoading} chatType={chatType} />
      <InputArea
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        isLoading={isLoading}
        chatType={chatType}
      />
    </div>
  );
};

export default ChatBot;
