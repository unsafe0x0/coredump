"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is BashForge?",
    answer:
      "BashForge is a comprehensive coding tracking platform that helps developers monitor their progress, maintain daily streaks, compete on leaderboards, and enhance their programming skills through gamification.",
  },
  {
    id: 2,
    question: "How does the daily streak feature work?",
    answer:
      "The daily streak tracks your consistent coding activity. Each day you code, your streak increases. Missing a day will reset your streak to zero. This feature helps build consistent coding habits and maintain momentum in your development journey.",
  },
  {
    id: 3,
    question: "Can I track multiple programming languages?",
    answer:
      "Yes! BashForge supports tracking across all major programming languages including JavaScript, Python, Java, C++, React, and many more. You can see detailed analytics for each language you use.",
  },
  {
    id: 4,
    question: "How do leaderboards work?",
    answer:
      "Leaderboards rank users based on various metrics like coding streaks, total coding time, and achievements earned. You can compete with developers worldwide and see how you stack up against the global community.",
  },
  {
    id: 5,
    question: "Is BashForge free to use?",
    answer:
      "Yes, BashForge offers a comprehensive free tier with access to core features including streak tracking, basic analytics, and leaderboards. Premium features may be available for advanced users.",
  },
  {
    id: 6,
    question: "How do I install the VS Code extension?",
    answer:
      "You can install the BashForge VS Code extension directly from the VS Code marketplace or from our GitHub repository. The extension automatically tracks your coding activity and syncs with your BashForge account.",
  },
  {
    id: 7,
    question: "What kind of achievements can I earn?",
    answer:
      "You can earn various achievements including streak milestones, language mastery badges, coding time goals, and special event rewards. Achievements help motivate consistent coding and skill development.",
  },
  {
    id: 8,
    question: "How is my coding data kept secure?",
    answer:
      "We prioritize your privacy and data security. All coding metrics are anonymized and encrypted. We only track coding patterns and statistics, never your actual code content.",
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center p-3 lg:container w-full gap-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-300 text-base font-normal max-w-2xl">
            Got questions? We've got answers. Find everything you need to know
            about BashForge.
          </p>
        </div>

        <div className="w-full max-w-4xl">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="mb-4 bg-neutral-900 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="text-lg font-medium text-white font-heading pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 text-neutral-300">
                  {openItems.includes(item.id) ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </div>
              </button>

              {openItems.includes(item.id) && (
                <div className="px-5 pb-5 pt-0">
                  <div className="pt-4">
                    <p className="text-neutral-300 text-base font-normal leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
