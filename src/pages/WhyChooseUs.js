


import React from "react";
import {
  FaBolt,
  FaBrain,
  FaLock,
  FaUserGraduate,
  FaGlobe,
} from "react-icons/fa";

const FeatureCard = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-4 bg-white border border-blue-100 shadow-md p-5 rounded-xl hover:shadow-blue-200 hover:scale-105 transition-all duration-300">
      <div className="text-3xl text-[#1a3b9c]">{icon}</div>
      <p className="text-gray-700 font-opensans text-base">{text}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    { icon: <FaBolt />, text: "Super-fast & reliable content generation" },
    { icon: <FaBrain />, text: "Built on advanced machine learning models" },
    { icon: <FaLock />, text: "Your data is safe and private" },
    {
      icon: <FaUserGraduate />,
      text: "Designed for students, creators, bloggers, and marketers",
    },
    { icon: <FaGlobe />, text: "Available 24/7 from any device" },
  ];

  return (
    <section
      id="why-instalingo"
      className="scroll-mt-24 py-20"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[#1a3b9c] mb-12 font-poppins">
          Why InstaLingo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
