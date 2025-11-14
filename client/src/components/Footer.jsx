// components/Footer.js - Modern redesign
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CivicSense
              </span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              AI-Powered Public Complaint Management Platform. 
              Making communities smarter, safer, and more responsive through technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white transition-colors duration-200 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors duration-200 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors duration-200 hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/complaint/submit" className="text-blue-200 hover:text-white transition-colors duration-200 hover:underline">
                  Submit Complaint
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-200" />
                <span className="group-hover:text-white transition-colors duration-200">support@civicsense.gov</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-200" />
                <span className="group-hover:text-white transition-colors duration-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-200" />
                <span className="group-hover:text-white transition-colors duration-200">123 Government St, City</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Services</h3>
            <ul className="space-y-2 text-blue-200">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">💧 Water Issues</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">⚡ Electricity Issues</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">🛣️ Road Maintenance</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">🗑️ Garbage Collection</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">🚨 Safety Hazards</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">🌿 Environmental Issues</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm flex items-center space-x-1">
            <span>&copy; {new Date().getFullYear()} CivicSense. All rights reserved.</span>
            <Heart className="h-4 w-4 text-red-400 inline" />
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;