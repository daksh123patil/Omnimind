import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn("flex gap-3 max-w-3xl mx-auto w-full", isUser && "flex-row-reverse")}
    >
      <div className={cn(
        "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
        isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <div className={cn(
        "rounded-2xl px-4 py-3 max-w-[80%]",
        isUser
          ? "bg-primary text-primary-foreground rounded-tr-md"
          : "bg-card border border-border rounded-tl-md shadow-sm"
      )}>
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ReactMarkdown
            className="text-sm prose prose-sm prose-slate dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
            components={{
              p: ({ children }) => <p className="my-1.5 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc">{children}</ul>,
              ol: ({ children }) => <ol className="my-1.5 ml-4 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="my-0.5">{children}</li>,
              code: ({ inline, children, ...props }) => {
                if (inline) {
                  return <code className="px-1.5 py-0.5 rounded-md bg-muted text-accent-foreground text-xs font-mono" {...props}>{children}</code>;
                }
                return (
                  <pre className="bg-muted rounded-lg p-3 overflow-x-auto my-2">
                    <code className="text-xs font-mono text-foreground" {...props}>{children}</code>
                  </pre>
                );
              },
              h1: ({ children }) => <h1 className="text-base font-semibold my-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-sm font-semibold my-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-semibold my-1.5">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-primary/30 pl-3 my-2 text-muted-foreground italic">
                  {children}
                </blockquote>
              ),
              a: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">{children}</a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
}
