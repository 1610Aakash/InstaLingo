
import React from "react";
import AnamikaProfile from "../assets/Images/Anamikaprofile.jpg";
import AakashProfile from "../assets/Images/Aakashprofile.jpg";
import PageWrapper from "../components/common/PageWrapper";

const teamMembers = [
  {
    name: "Aakash Rajput",
    role: "Project Lead / AI Developer",
    image: AakashProfile,
    description: "Leading AI development and ensuring seamless integration of machine learning models into the project.",
  },
  {
    name: "Anamika Jaiswal",
    role: "Project Manager / Web Developer",
    image: AnamikaProfile,
    description: "Managing project execution, overseeing web development, and ensuring a smooth user experience with modern technologies.",
  },
];

const TeamMember = ({ name, role, image, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105 w-full max-w-xs">
    {image ? (
      <img
        src={image}
        alt={name}
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gradient-to-r from-[#1a3b9c] to-[#4f7bdb] shadow-sm"
        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
      />
    ) : (
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        ❌ No Image
      </div>
    )}
    <div className="text-center mt-4">
      <h3 className="text-xl sm:text-2xl font-bold text-[#1a3b9c]">{name}</h3>
      <p className="text-md text-gray-500">{role}</p>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  </div>
);

const TeamSection = () => (
  <PageWrapper>
    <section className="w-full min-h-screen flex items-center justify-center bg-[#f8f9ff] py-10" id="about">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        {/* Left Column */}
        <div className="flex flex-col justify-center items-start text-left space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1a3b9c]">About the Team</h2>
          <p className="text-gray-600 text-md md:text-lg leading-relaxed">
            We’re a dynamic group of individuals passionate about what we do and dedicated to delivering the best results for our users.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center space-y-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

export default TeamSection;
