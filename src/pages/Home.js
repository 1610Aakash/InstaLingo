


import React from "react"
import CTAButton from "../components/core/HomePage/Button"
import Image1 from "../assets/Images/Image1.png"
import Image2 from "../assets/Images/Image2.png"
import Image3 from "../assets/Images/Image3.png"
import Image4 from "../assets/Images/Image4.png"
import Footer from "../components/common/Footer"
import TeamSection from "./TeamSection"
import ContactSection from "./ContactSection"
import FAQSection from "./FAQSection"
import HowItWorks from "./HowItWorks"
import WhyChooseUs from "./WhyChooseUs"
import HelpCenter from "./HelpCenter"
import { Toaster } from "react-hot-toast"
import FeaturesSection from "./FeaturesSection"
import PageWrapper from "../components/common/PageWrapper"

const Home = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col w-full min-h-screen">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center w-full px-4 py-12">
          {/* Left Side */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-blue-800">
              Think it. Type it. AI Perfects it.
            </h1>
            <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-xl">
              Generate, edit, and optimize content with the smartest AI assistant.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                Learn more
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Get Started
              </CTAButton>
            </div>
          </div>

          {/* Right Side - Images */}
          {/* Right Side - Images */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 items-center mt-10 w-full max-w-5xl mx-auto px-4">
  {/* Column 1 */}
  <div className="flex justify-center">
    <img
      src={Image1}
      alt="AI Brain"
      loading="lazy"
      className="rounded-2xl shadow-lg shadow-blue-500/50 w-full max-w-[150px] aspect-[2/3] object-cover"
    />
  </div>

  {/* Column 2 - Two stacked images */}
  <div className="flex flex-col items-center gap-4">
    <img
      src={Image2}
      alt="AI Robot"
      loading="lazy"
      className="rounded-2xl shadow-lg shadow-blue-500/50 w-full max-w-[150px] aspect-[2/3] object-cover"
    />
    <img
      src={Image3}
      alt="Laptop AI"
      loading="lazy"
      className="rounded-2xl shadow-lg shadow-blue-500/50 w-full max-w-[150px] aspect-[2/3] object-cover"
    />
  </div>

  {/* Column 3 */}
  <div className="flex justify-center">
    <img
      src={Image4}
      alt="Tech Bot"
      loading="lazy"
      className="rounded-2xl shadow-lg shadow-blue-500/50 w-full max-w-[150px] aspect-[2/3] object-cover"
    />
  </div>
</div>

        </div>

        
        
<div className="bg-gradient-to-r from-[#eef2ff] to-[#f5faff]">
        <FeaturesSection />
  <WhyChooseUs />
  <HowItWorks />
  <TeamSection />
</div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Help Center */}
        <HelpCenter />

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#4F46E5",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "500",
              padding: "16px 24px",
              borderRadius: "10px",
            },
            success: {
              iconTheme: {
                primary: "#ffffff",
                secondary: "#4F46E5",
              },
            },
          }}
        />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default Home
