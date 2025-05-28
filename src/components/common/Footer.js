




import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4">
        <NavLinks />
        <SocialIcons />
        <p className="text-sm text-gray-300 text-center">
          © 2025 InstaLingo, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const NavLinks = () => {
  const links = [
    { label: "About", href: "#about" },
    { label: "FAQs", href: "#faqs" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Help Center", href: "#help" },
    { label: "Contact Us", href: "#contact" },
  ];
  return (
    <nav className="w-full">
      <ul className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:text-gray-300 transition duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SocialIcons = () => {
  const icons = [
    { icon: <FaFacebook />, link: "#", label: "Facebook" },
    { icon: <FaInstagram />, link: "#", label: "Instagram" },
    { icon: <FaXTwitter />, link: "#", label: "Twitter" },
    { icon: <FaGithub />, link: "#", label: "GitHub" },
    { icon: <FaYoutube />, link: "#", label: "YouTube" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-6 text-lg">
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.link}
          className="hover:text-gray-300 transition duration-200"
          aria-label={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Footer;
