'use client';

import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="rounded-2xl bg-muted/60 px-4 py-3">
        <div className="flex items-center gap-1">
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
