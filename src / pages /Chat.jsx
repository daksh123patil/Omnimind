import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { AnimatePresence } from 'framer-motion';
import MessageBubble from '@/components/chat/MessageBubble';
import TypingIndicator from '@/components/chat/TypingIndicator';
import ChatInput from '@/components/chat/ChatInput';
import EmptyState from '@/components/chat/EmptyState';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (content) => {
    const userMsg = { role: 'user', content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    const conversationContext = updatedMessages
      .slice(-10)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n\n');

    const prompt = `You are a helpful, friendly, and knowledgeable AI assistant. Answer clearly and concisely. Use markdown formatting when helpful (lists, bold, code blocks, etc.).

Conversation so far:
${conversationContext}

Please respond to the user's latest message.`;

    const response = await base44.integrations.Core.InvokeLLM({ prompt });
    setMessages([...updatedMessages, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background font-inter">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">AI</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground leading-none">AI Assistant</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Ask me anything</p>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={sendMessage} />
        ) : (
          <div className="space-y-5">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            <AnimatePresence>
              {isLoading && <TypingIndicator />}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-border bg-background/80 backdrop-blur-md px-4 py-4">
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
