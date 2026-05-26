"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How can I learn Quran online with proper Tajweed?",
    answer: "TajweedPage.com provides live one-on-one online Quran classes with qualified teachers who help students improve pronunciation, recitation, and Tajweed step by step.",
  },
  {
    question: "Do you offer online Quran classes for kids?",
    answer: "Yes. We offer interactive and beginner-friendly Quran classes specially designed for children with engaging teaching methods and personalized attention.",
  },
  {
    question: "Are female Quran tutors available?",
    answer: "Yes. We provide experienced female Quran teachers for sisters and children in a comfortable and professional learning environment.",
  },
  {
    question: "What is the best age for children to start Quran learning?",
    answer: "Children can begin learning Noorani Qaida and basic Quran reading from the age of 4–5 years depending on their learning ability and interest.",
  },
  {
    question: "Do you offer flexible timings for USA, UK, and Canada students?",
    answer: "Yes. We provide flexible schedules for students worldwide including the USA, UK, Canada, Australia, UAE, and other countries.",
  },
  {
    question: "Can beginners join TajweedPage.com?",
    answer: "Absolutely. Our courses are designed for complete beginners as well as intermediate and advanced students who want to improve Quran recitation and Tajweed.",
  },
  {
    question: "How do I start online Quran classes at TajweedPage.com?",
    answer: "You can start by booking a free trial class. Our team will guide you through course selection, scheduling, and the complete enrollment process.",
  }
];

interface FAQAccordionBlockProps {
  onCtaclick: () => void;
}

export function FAQAccordionBlock({ onCtaclick }: FAQAccordionBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq-section" className="w-full bg-black py-24 sm:py-32 border-t border-white/5 relative z-10">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 border border-[#C8EB5F]/20 bg-[#C8EB5F]/5 text-[#C8EB5F] text-[10px] font-mono tracking-[0.25em] px-4 py-1.5 uppercase rounded-full mb-6 font-bold">
            <HelpCircle size={12} className="text-[#C8EB5F]" />
            FAQ REVEAL
          </span>
          <h2 className="mb-6 text-4xl sm:text-6xl font-serif font-light uppercase text-white tracking-tight leading-none">
            Frequently Asked <span className="italic block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#C8EB5F] to-emerald-300">Questions</span>
          </h2>
          <p className="mx-auto max-w-lg text-sm text-neutral-450 font-sans font-light leading-relaxed">
            Have a question? We've got answers. If you don't find what you're looking for, feel free to coordinate with our service advisors.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className={`overflow-hidden border transition-all duration-300 rounded-[24px] ${
                  isOpen ? "border-[#C8EB5F]/30 bg-zinc-950" : "border-white/5 bg-zinc-950/40 hover:border-white/10"
                }`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-6 sm:p-8 text-left transition-colors cursor-pointer group"
                  >
                    <span className={`pr-4 text-base sm:text-lg font-serif font-light tracking-wide transition-colors ${
                      isOpen ? "text-[#C8EB5F]" : "text-white group-hover:text-[#C8EB5F]"
                    }`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-neutral-500 group-hover:text-[#C8EB5F]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 p-6 sm:p-8 bg-zinc-950">
                          <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="border border-white/5 bg-zinc-950/70 p-8 sm:p-12 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8EB5F]/5 rounded-bl-full pointer-events-none" />
            <MessageCircle className="mx-auto mb-6 h-12 w-12 text-[#C8EB5F]" />
            <h3 className="mb-3 text-2xl sm:text-3xl font-serif text-white uppercase font-light">
              Still have questions?
            </h3>
            <p className="mb-8 text-sm text-neutral-400 font-sans font-light max-w-sm mx-auto leading-relaxed">
              Our team is here to help. Get in touch and we'll respond as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onCtaclick}
                className="inline-flex items-center justify-center gap-2 bg-[#C8EB5F] hover:bg-white text-black px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-colors rounded-none cursor-pointer"
              >
                <span>Book Free Trial Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
