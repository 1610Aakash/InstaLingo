import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import TeamSection from "./pages/TeamSection"; 
import ContactSection from "./pages/ContactSection";
import FloatingIconsFeatures from "./pages/FeaturesSection";
import SummarizationPage from "./components/features/SummarizationPage"; // Add these imports
import TranslatorPage from "./components/features/TranslatorPage";
import TextToImagePage from "./components/features/TextToImagePage";
import SentimentAnalysisPage from "./components/features/SentimentAnalysisPage";
import ChatbotPage from "./components/features/ChatbotPage";
import { AnimatePresence } from "framer-motion";
// import Login from './pages/Login';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword"; // Adjust path if needed

import Dashboard from "./components/DashboardSection/Dashboard"; // This should be your dashboard component import PrivateRoute from "./components/DashboardSection/PrivateRoute"; // You'll create this next
import PrivateRoute from "./components/DashboardSection/PrivateRoute";



function App  ()  {
  return (
    <AnimatePresence mode="wait">
    <div className="w-screen min-h-screen  flex flex-col">
      <Navbar/>
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<TeamSection />} />
  <Route path="/contact" element={<ContactSection />} />
  <Route path="/features" element={<FloatingIconsFeatures />} />

  {/* Feature Pages */}
  <Route path="/features/summarization" element={<SummarizationPage />} />
  <Route path="/features/translator" element={<TranslatorPage />} />
  <Route path="/features/text-to-image" element={<TextToImagePage />} />
  <Route path="/features/sentiment-analysis" element={<SentimentAnalysisPage />} />
  <Route path="/features/chatbot" element={<ChatbotPage />} />

  {/* Auth Routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />


  {/* Protected Route */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />
  
  

</Routes>

      

    </div>
    </AnimatePresence>
  )
}

export default App;

