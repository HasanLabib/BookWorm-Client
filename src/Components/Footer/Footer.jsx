import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo.jpg"; 
const socialLinks = [
  { name: "Twitter", url: "https://twitter.com", icon: <FaXTwitter /> },
  { name: "Facebook", url: "https://facebook.com", icon: <FaFacebookF /> },
  { name: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
];

const footerLinks = [
  {
    name: "Information",
    url: "https://www.sciencedirect.com/topics/computer-science/meta-information",
  },
  { name: "Privacy Policy", url: "https://x.com/en/privacy" },
  { name: "Terms & Conditions", url: "https://www.facebook.com/terms/" },
  { name: "Join Us", url: "/signup" },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10 mt-16 justify-center items-center-safe">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <Link to="/">
            <img src={logo} alt="Site Logo" className="w-32" />
          </Link>
          <p className="text-gray-600">
            BookWarm
            <br />
            For Book enthusiasts.
          </p>
          <div className="flex gap-4 mt-2 text-2xl">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <h6 className="font-semibold mb-2">Quick Links</h6>
          {footerLinks.map((link, i) => (
            <Link
              key={i}
              to={link.url}
              className="hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <h6 className="font-semibold mb-2">Contact Us</h6>
          <a
            href="mailto:contact@localfood.com"
            className="hover:text-primary transition-colors"
          >
            contact@bookwarm.com
          </a>
          <a
            href="tel:+880123456789"
            className="hover:text-primary transition-colors"
          >
            +880 1234 56789
          </a>
          <a
            href="https://www.google.com/maps?q=Dhaka,+Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Dhaka, Bangladesh
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10 text-sm">
        &copy; {new Date().getFullYear()} Bookwarm. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
