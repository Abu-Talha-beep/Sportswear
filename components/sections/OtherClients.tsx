'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const clients = [
  { name: 'Sport England', logo: 'https://placehold.co/200x100/cccccc/666666?text=Sport+England' },
  { name: 'England Rugby', logo: 'https://placehold.co/200x100/cccccc/666666?text=England+Rugby' },
  { name: 'UK Active', logo: 'https://placehold.co/200x100/cccccc/666666?text=UK+Active' },
  { name: 'RFU', logo: 'https://placehold.co/200x100/cccccc/666666?text=RFU' },
  { name: 'FA', logo: 'https://placehold.co/200x100/cccccc/666666?text=FA' },
  { name: 'Sport Wales', logo: 'https://placehold.co/200x100/cccccc/666666?text=Sport+Wales' },
  { name: 'NHS Sport', logo: 'https://placehold.co/200x100/cccccc/666666?text=NHS+Sport' },
  { name: 'Youth Sport Trust', logo: 'https://placehold.co/200x100/cccccc/666666?text=YST' },
];

export function OtherClients() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
            Our Other Clients
          </h2>
          <p className="text-muted mt-2">Trusted by leading organisations across the UK</p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative w-32 h-16 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
