


import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaRegCommentDots,
  FaLanguage,
  FaImage,
  FaRegSmile,
  FaRobot,
} from "react-icons/fa";
import PageWrapper from "../components/common/PageWrapper";

// Reusable FloatingIconCard component
const FloatingIconCard = ({ icon: Icon, title, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 w-40 sm:w-44 md:w-48 h-48 hover:shadow-xl transition-all cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="text-4xl md:text-5xl text-blue-600 mb-4">
        <Icon />
      </div>
      <h3 className="text-base md:text-lg font-semibold text-gray-700 text-center">
        {title}
      </h3>
    </motion.div>
  );
};

const FloatingIconsFeatures = () => {
  const features = [
    {
      title: "Text Summarization",
      icon: FaRegCommentDots,
      link: "/features/summarization",
    },
    {
      title: "Language Translator",
      icon: FaLanguage,
      link: "/features/translator",
    },
    {
      title: "Text to Image",
      icon: FaImage,
      link: "/features/text-to-image",
    },
    {
      title: "Sentiment Analysis",
      icon: FaRegSmile,
      link: "/features/sentiment-analysis",
    },
    {
      title: "AI Chatbot Assistant",
      icon: FaRobot,
      link: "/features/chatbot",
    },
  ];

  return (
    <PageWrapper>
      <section
        id="features"
        className="min-h-screen w-full flex flex-col items-center justify-start pt-28 pb-16 bg-gradient-to-r from-blue-50 to-purple-50 px-6 md:px-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore InstaLingo Features
          </h2>
          <p className="text-gray-500 text-md sm:text-lg max-w-2xl mx-auto">
            Modern AI tools to power your creativity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {features.map((feature, index) => (
            <FloatingIconCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              link={feature.link}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default FloatingIconsFeatures;
