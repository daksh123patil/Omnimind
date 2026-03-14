import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="relative bg-card border border-border rounded-2xl shadow-lg transition-shadow focus-within:shadow-xl focus-within:border-primary/30">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          rows={1}
          className="w-full resize-none bg-transparent px-5 py-4 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-inter"
          disabled={isLoading}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-3 bottom-3 h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-center text-[11px] text-muted-foreground/60 mt-2.5">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
