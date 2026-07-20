"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  label?: string;
}

export default function FAQAccordion({ items, title, label }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {(label || title) && (
        <div className="text-center mb-10">
          {label && <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-2">{label}</p>}
          {title && <h2 className="font-serif text-3xl font-bold text-navy">{title}</h2>}
        </div>
      )}

      <div>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-gold/20 py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="group w-full flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="font-medium text-navy text-base group-hover:text-gold transition-colors">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-dark/80 text-sm leading-relaxed pt-3">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}
