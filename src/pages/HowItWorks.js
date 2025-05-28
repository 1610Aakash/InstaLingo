


import React from "react";
import { FaUpload, FaBrain, FaMagic, FaDownload } from "react-icons/fa";

const StepCard = ({ id, icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-xl hover:shadow-blue-200 transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center relative overflow-hidden">
      <span className="absolute -top-4 -right-4 text-6xl font-extrabold text-blue-100 opacity-20 z-0">
        {id}
      </span>
      <div className="text-5xl text-[#1a3b9c] z-10 relative mb-4" aria-label="step-icon">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 font-[Poppins]">
        {title}
      </h3>
      <p className="text-gray-500 text-sm md:text-base font-[Open_Sans]">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Type or Upload Your Text",
      description: "Input your rough draft or paste content.",
      icon: <FaUpload />,
    },
    {
      id: 2,
      title: "Choose a Feature",
      description: "Select what you want to do—summarize, correct, translate, or analyze.",
      icon: <FaBrain />,
    },
    {
      id: 3,
      title: "Let AI Work Its Magic",
      description: "InstaLingo processes your content using cutting-edge ML models.",
      icon: <FaMagic />,
    },
    {
      id: 4,
      title: "Review & Download",
      description: "Get your polished content, ready for use or further edits.",
      icon: <FaDownload />,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 py-20"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-[#1a3b9c] mb-12 font-[Poppins]">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              id={step.id}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
