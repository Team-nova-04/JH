// components/Footer.js - Maroon color scheme
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#000000] to-[#000000] text-white">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6 space-x-3">
              <div className="bg-gradient-to-br from-[#FF8C00] to-[#FFD700] p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                CivicSense
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-orange-100">
              AI-Powered Public Complaint Management Platform. 
              Making communities smarter, safer, and more responsive through technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 text-orange-200 transition-colors duration-200 rounded-lg hover:text-white hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-orange-200 transition-colors duration-200 rounded-lg hover:text-white hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-orange-200 transition-colors duration-200 rounded-lg hover:text-white hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-orange-100 transition-colors duration-200 hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-orange-100 transition-colors duration-200 hover:text-white hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-orange-100 transition-colors duration-200 hover:text-white hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/complaint/submit" className="text-orange-100 transition-colors duration-200 hover:text-white hover:underline">
                  Submit Complaint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Contact</h3>
            <ul className="space-y-3 text-orange-100">
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-orange-300 transition-colors duration-200 group-hover:text-white" />
                <span className="transition-colors duration-200 group-hover:text-white">support@civicsense.gov</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-orange-300 transition-colors duration-200 group-hover:text-white" />
                <span className="transition-colors duration-200 group-hover:text-white">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <MapPin className="w-5 h-5 text-orange-300 transition-colors duration-200 group-hover:text-white" />
                <span className="transition-colors duration-200 group-hover:text-white">123 Government Street, Colombo</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Services</h3>
            <ul className="space-y-2 text-orange-100">
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">💧</span>
                <span>Water Issues</span>
              </li>
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">⚡</span>
                <span>Electricity Issues</span>
              </li>
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">🛣️</span>
                <span>Road Maintenance</span>
              </li>
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">🗑️</span>
                <span>Garbage Collection</span>
              </li>
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">🚨</span>
                <span>Safety Hazards</span>
              </li>
              <li className="flex items-center space-x-2 transition-colors duration-200 cursor-pointer hover:text-white">
                <span className="text-[#FFD700]">🌿</span>
                <span>Environmental Issues</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-orange-300/30 md:flex-row">
          <p className="flex items-center space-x-1 text-sm text-orange-100">
            <span>&copy; {new Date().getFullYear()} CivicSense. All rights reserved.</span>
            <Heart className="h-4 w-4 text-[#FFD700] inline" />
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <a href="#" className="text-sm text-orange-100 transition-colors duration-200 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-orange-100 transition-colors duration-200 hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-orange-100 transition-colors duration-200 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;