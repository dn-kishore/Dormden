<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect, useRef } from 'react';
>>>>>>> 0c47ffa (second commit)
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  sources?: string[];
  isAI?: boolean;
}

interface WardenBotProps {
  propertyId?: string;
  propertyName?: string;
}

export const WardenBot = ({ propertyId: propId, propertyName }: WardenBotProps) => {
  const params = useParams();
  const propertyId = propId || params.id;
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
<<<<<<< HEAD
=======
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);
>>>>>>> 0c47ffa (second commit)

  // Check AI status on mount
  useEffect(() => {
    const checkAIStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/rag/status`);
        const data = await res.json();
        setAiEnabled(data.data?.gemini || false);
      } catch {
        setAiEnabled(false);
      }
    };
    checkAIStatus();
  }, []);

  // Add welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          text: propertyName 
            ? `Hi! I'm the Warden Bot for ${propertyName}. Ask me anything about the rules, policies, curfew, guests, or facilities!`
            : "Hi! I'm the Warden Bot. Select a property to ask specific questions, or ask me general questions about PG rules!",
          isAI: aiEnabled,
        },
      ]);
    }
  }, [isOpen, propertyName, aiEnabled]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/rag/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input,
          listingId: propertyId || null,
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: data.success 
          ? data.data.answer 
          : 'Sorry, I encountered an error. Please try again.',
        sources: data.data?.sources,
        isAI: data.data?.isAI !== false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          text: "I'm having trouble connecting to the server. Please make sure the server is running.",
          isAI: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = propertyId
    ? ['What is the curfew time?', 'Are guests allowed?', 'Can I cook here?', 'Any hidden costs?']
    : ['Tell me about curfew policies', 'What about guest rules?', 'Pet-friendly PGs?'];

  return (
    <>
      {/* Floating Button */}
      <Button
        className="fixed bottom-24 md:bottom-8 right-4 z-40 shadow-2xl shadow-cyan-500/25 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 h-14 px-6"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">Ask Warden Bot</span>
        {aiEnabled && <Sparkles className="w-4 h-4 ml-2 text-yellow-200" />}
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full md:w-[420px] h-[85vh] md:h-[600px] md:max-h-[80vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-cyan-500 to-purple-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    Warden Bot
                    {aiEnabled && (
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">AI</span>
                    )}
                  </h3>
                  <p className="text-xs text-white/80">
                    {propertyName || 'Ask about rules & policies'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl rounded-br-sm'
                        : 'bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm'
                    } p-4 space-y-2`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 text-cyan-500 shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.sources && message.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                        {message.sources.map((source, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            📋 {source}
                          </span>
                        ))}
                      </div>
                    )}
                    {message.isAI && message.type === 'bot' && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Sparkles className="w-3 h-3" />
                        <span>AI-powered response</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
<<<<<<< HEAD
=======
              <div ref={messagesEndRef} />
>>>>>>> 0c47ffa (second commit)
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about curfew, guests, rules..."
                  disabled={loading}
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
                />
                <Button 
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 rounded-xl h-12 w-12"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
