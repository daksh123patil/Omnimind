import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  "Explain quantum computing in simple terms",
  "Write a poem about the ocean",
  "What are 5 tips for productivity?",
  "Help me plan a weekend trip",
];

export default function EmptyState({ onSuggestionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center flex-1 px-4"
    >
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-foreground font-inter tracking-tight mb-2">
        How can I help you?
      </h1>
      <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
        Ask me anything — from creative writing to coding, research to brainstorming.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            onClick={() => onSuggestionClick(s)}
            className="text-left px-4 py-3 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all text-sm text-foreground/80 hover:text-foreground shadow-sm"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
