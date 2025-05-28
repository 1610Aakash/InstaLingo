
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineRobot,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { MdTextFields, MdTranslate, MdTextsms } from 'react-icons/md';
import {  FaRegImage } from 'react-icons/fa';

export const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  const links = [
    ['Dashboard', <AiOutlineHome />, '/dashboard'],
    ['Text Summarizer', <MdTextFields />, '/features/summarization'],
    ['Sentiment Analyzer', <MdTextsms />, '/features/sentiment-analysis'],
    
    [' Text to Image', <FaRegImage />, '/features/text-to-image'],
    ['Translator', <MdTranslate />, '/features/translator'],
    ['Chatbot', <AiOutlineRobot />, '/features/chatbot'],
    ['Help Center', <AiOutlineQuestionCircle />, '/pages/help'],
  ];

  return (
    <>
      {/* Backdrop on mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
        />
      )}

      <div
        className={`fixed z-30 inset-y-0 left-0 transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out bg-white w-64 shadow-lg md:shadow-none`}
      >
        

        {/* Close button on mobile */}
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold text-blue-600">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-gray-700 text-xl">
            ✖
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2 overflow-y-auto max-h-screen">
          {links.map(([label, icon, path], idx) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={idx}
                to={path}
                className={`group flex items-center space-x-3 px-3 py-2 rounded-md relative ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                } hover:text-blue-700 hover:bg-blue-50 transition`}
                onClick={() => setOpen(false)}
              >
                {/* Active indicator bar */}
                <div className={`absolute left-0 top-0 h-full w-1 rounded-r-md ${isActive ? 'bg-blue-600' : ''}`}></div>

                <span className="text-xl min-w-[24px] group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <span className="text-base">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
