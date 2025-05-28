
import React, { useState } from "react";
import PageWrapper from "../components/common/PageWrapper";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 text-base sm:text-lg font-semibold text-[#1a3b9c] hover:text-[#0f255d] transition-colors duration-200"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="ml-2 text-[#1a3b9c] text-xl">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="text-gray-700 text-sm sm:text-base pb-4 pl-2 pr-2">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Is InstaLingo free to use?",
      answer: "Yes! All features are currently free during our beta launch period.",
    },
    {
      question: "Is my content saved or stored?",
      answer: "No. InstaLingo processes your input securely in real-time and never stores any data.",
    },
    {
      question: "Can I use InstaLingo on mobile devices?",
      answer: "Absolutely! InstaLingo is responsive and works great on phones, tablets, and desktops.",
    },
    {
      question: "How do I get started with InstaLingo?",
      answer: "Just click on 'Get Started' on the homepage. No sign-up is required at this stage!",
    },
    {
      question: "What kind of content can InstaLingo help me create?",
      answer: "From essays, emails, and reports to blogs and captions—our AI supports all forms of writing.",
    },
    {
      question: "Does InstaLingo use AI models like GPT?",
      answer: "Yes, our platform is powered by advanced NLP models for high-quality text generation.",
    },
    {
      question: "Do I need to install anything?",
      answer: "Not at all. It's completely web-based—just open your browser and start writing!",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <PageWrapper>
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 mt-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-[#1a3b9c] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default FAQSection;




