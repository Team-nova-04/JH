import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Users, Shield, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // Scroll to top when component mounts (on reload)
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a contact API
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}30, transparent)`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div 
          className="mb-16 text-center"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <MessageSquare className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div 
            className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
              <Users className="h-8 w-8 mr-3 text-[#8D153A]" />
              Get in Touch
            </h2>
            <div className="space-y-8">
              <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                <div className="bg-gradient-to-br from-[#8D153A] to-[#A52D5A] p-3 rounded-xl shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-700">support@civicsense.lk</p>
                  <p className="mt-1 text-sm text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-3 rounded-xl shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-700">+94 11 234 5678</p>
                  <p className="mt-1 text-sm text-gray-600">Mon-Fri, 8:00 AM - 6:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60">
                <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-3 rounded-xl shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-700">123 Government Complex</p>
                  <p className="text-gray-700">Colombo 01, Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-2xl text-white">
              <h3 className="flex items-center mb-3 text-lg font-bold">
                <Shield className="h-5 w-5 mr-2 text-[#FFBE29]" />
                Why Contact Us?
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#FFBE29]" />
                  Technical support and troubleshooting
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#FFBE29]" />
                  Feature requests and suggestions
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#FFBE29]" />
                  Partnership opportunities
                </li>
                <li className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#FFBE29]" />
                  Media and press inquiries
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
              <Send className="h-8 w-8 mr-3 text-[#8D153A]" />
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-3 text-sm font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-3 text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-3 text-sm font-semibold text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-3 text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>
              
              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                <Send className="relative z-10 w-5 h-5 mr-3" />
                <span className="relative z-10">Send Message</span>
              </button>
            </form>

            {/* Response Time Info */}
            <div className="p-4 mt-6 text-center border bg-white/40 rounded-xl border-white/60">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#8D153A]">Typical response time:</span>{' '}
                Within 24 hours during business days
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div 
          className="p-8 mt-16 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "How long does it take to resolve a complaint?",
                answer: "Most complaints are resolved within 3-7 business days, depending on complexity and authority response time."
              },
              {
                question: "Can I submit complaints anonymously?",
                answer: "Yes, you can choose to submit complaints anonymously to protect your privacy."
              },
              {
                question: "What types of complaints can I submit?",
                answer: "You can submit various public service complaints including infrastructure, sanitation, public safety, and more."
              },
              {
                question: "How do I track my complaint status?",
                answer: "Registered users can track complaint status in their dashboard. You'll receive updates via email."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="p-4 border bg-white/40 rounded-xl border-white/60"
                data-aos="fade-up"
                data-aos-delay={600 + (index * 100)}
              >
                <h3 className="mb-2 font-semibold text-gray-800">{faq.question}</h3>
                <p className="text-sm text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;