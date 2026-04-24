'use client';

import { useState, useEffect } from 'react';

const defaultMessages = [
  'FREE delivery on orders over £50 🚚',
  '#STASHLIFE — Join the movement',
  'Welcome to Your Club Stash!',
];

export function AnnouncementBar() {
  const [messages, setMessages] = useState<string[]>(defaultMessages);

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch {
        // keep defaults
      }
    }
    loadMessages();
  }, []);

  // Duplicate messages for seamless loop
  const doubledMessages = [...messages, ...messages];

  return (
    <div className="bg-primary text-white overflow-hidden relative z-50" role="marquee" aria-label="Announcements">
      <div className="animate-ticker flex whitespace-nowrap py-2">
        {doubledMessages.map((msg, i) => (
          <span key={i} className="mx-8 text-xs font-medium tracking-wider uppercase">
            {msg}
            <span className="mx-6 opacity-40">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
