import { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { ChatType } from '../types';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
  chatType: ChatType;
}

const InputArea = ({ onSendMessage, onClearChat, isLoading, chatType }: InputAreaProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isMentalHealth = chatType === 'mental-health';
  const bgColor = isMentalHealth ? 'bg-teal-500' : 'bg-orange-500';
  const hoverColor = isMentalHealth ? 'hover:bg-teal-600' : 'hover:bg-orange-600';
  const focusRing = isMentalHealth ? 'focus:ring-teal-200' : 'focus:ring-orange-200';
  const focusBorder = isMentalHealth ? 'focus:border-teal-500' : 'focus:border-orange-500';

  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={`flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none ${focusBorder} focus:ring-2 ${focusRing} resize-none transition-all`}
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`p-3 ${bgColor} text-white rounded-full ${hoverColor} disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95`}
        >
          <Send size={20} />
        </button>
        <button
          onClick={onClearChat}
          className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-all hover:scale-105 active:scale-95"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
