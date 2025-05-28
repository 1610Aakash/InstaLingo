




import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRocket, FaCogs, FaShieldAlt } from "react-icons/fa";
import PageWrapper from "../components/common/PageWrapper";

const FAQItem = ({ id, question, answer, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === id;

  const toggleOpen = () => {
    setOpenIndex(isOpen ? null : id);
  };

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 text-base sm:text-lg font-semibold text-[#1a3b9c] hover:text-[#0f255d] transition-colors duration-200"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
      >
        <span>{question}</span>
        <span className="ml-2 text-[#1a3b9c] text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pl-2 pr-2"
          >
            <p className="text-gray-700 text-sm sm:text-base pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpCenterSection = ({ title, faqs, icon, openIndex, setOpenIndex, startIndex }) => (
  <div className="mb-14">
    <div className="flex items-center gap-3 mb-6 border-b-2 border-[#d6e0ff] pb-2">
      <span className="text-[#1a3b9c] text-2xl">{icon}</span>
      <h3 className="text-2xl font-semibold text-[#1a3b9c]">{title}</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {faqs.map((faq, idx) => (
        <FAQItem
          key={startIndex + idx}
          id={startIndex + idx}
          question={faq.question}
          answer={faq.answer}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
        />
      ))}
    </div>
  </div>
);

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const gettingStarted = [
    {
      question: "How do I create an account or sign in?",
      answer:
        "Click on the Sign Up or Login button on the homepage and follow the instructions to access your writing dashboard.",
    },
    {
      question: "What features can I access during the free trial?",
      answer:
        "During the free trial, you’ll have full access to premium tools like grammar correction, text summarization, AI-powered translations, and more.",
    },
  ];

  const usingFeatures = [
    {
      question: "Is there a word limit for grammar check, summarization, or translations?",
      answer:
        "You can submit up to 1000 words per grammar check and up to 1500 words for summarization or translation tasks.",
    },
  ];

  const accountSecurity = [
    {
      question: "How can I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page and follow the email instructions to set a new password securely.",
    },
    {
      question: "How do I reach customer support?",
      answer:
        "Click the 'Contact Us' option in the navigation bar or email us directly — we’re here to help!",
    },
  ];

  return (
    <PageWrapper>
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 mt-[75px]" id="help" >
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a3b9c] mb-4">
              Help Center
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Visit our Help Center for guides, tutorials, and support.<br />
              Need more help? We're here for you.
            </p>
          </div>

          <HelpCenterSection
            title="Getting Started"
            faqs={gettingStarted}
            icon={<FaRocket />}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            startIndex={0}
          />

          <HelpCenterSection
            title="Using Features"
            faqs={usingFeatures}
            icon={<FaCogs />}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            startIndex={gettingStarted.length}
          />

          <HelpCenterSection
            title="Account & Support"
            faqs={accountSecurity}
            icon={<FaShieldAlt />}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            startIndex={gettingStarted.length + usingFeatures.length}
          />

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-[#1a3b9c] hover:bg-[#0f255d] text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Still have questions? Contact Us
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HelpCenter;
