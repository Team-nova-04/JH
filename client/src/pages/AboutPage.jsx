import { useEffect } from 'react';
import { Shield, Target, Users, Zap, BarChart3, MapPin, MessageSquare, CheckCircle, Globe, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
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

      <div className="relative z-10 max-w-6xl mx-auto">
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
                <Shield className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            About CivicSense
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Empowering Sri Lankan citizens through AI-powered public complaint management and civic engagement
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Mission Section */}
          <div 
            className="p-8 mt-[-20px] border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-start space-x-6">
              <div 
                className="bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-2xl shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-800">Our Mission</h2>
                <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                  <p data-aos="fade-right" data-aos-delay="400">
                    CivicSense is an innovative platform designed to bridge the gap between citizens
                    and public authorities in Sri Lanka. We leverage cutting-edge artificial intelligence
                    and natural language processing to streamline the complaint submission and resolution process.
                  </p>
                  <p data-aos="fade-right" data-aos-delay="500">
                    Our mission is to make public service more accessible, transparent, and efficient by
                    providing a user-friendly platform that automatically routes complaints to the
                    appropriate authorities and prioritizes urgent issues for faster resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div 
            className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">How CivicSense Works</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div 
                className="p-6 text-center transition-all duration-300 border bg-white/40 rounded-2xl border-white/60 hover:shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="bg-gradient-to-br from-[#8D153A] to-[#A52D5A] p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">1. Submit Your Complaint</h3>
                <p className="leading-relaxed text-gray-700">
                  Citizens can submit complaints either anonymously or with an account. Describe your issue,
                  provide location details, and optionally upload images for better context.
                </p>
              </div>

              <div 
                className="p-6 text-center transition-all duration-300 border bg-white/40 rounded-2xl border-white/60 hover:shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <div className="bg-gradient-to-br from-[#00534E] to-[#008080] p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">2. AI Processing & Analysis</h3>
                <p className="leading-relaxed text-gray-700">
                  Our advanced AI system analyzes your complaint using sentiment analysis and
                  zero-shot classification to determine category, urgency level, and automatically
                  assign it to the appropriate authority.
                </p>
              </div>

              <div 
                className="p-6 text-center transition-all duration-300 border bg-white/40 rounded-2xl border-white/60 hover:shadow-lg"
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                <div className="bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">3. Resolution & Tracking</h3>
                <p className="leading-relaxed text-gray-700">
                  Assigned authorities receive the complaint, update its status, add progress notes,
                  and work towards resolution. Citizens can track real-time progress of their complaints.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div 
            className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Key Features</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { icon: Zap, text: "AI-powered complaint classification and urgency detection" },
                { icon: MapPin, text: "Automatic routing to appropriate authorities" },
                { icon: BarChart3, text: "Support for multiple complaint categories" },
                { icon: Shield, text: "Anonymous complaint submission option" },
                { icon: Target, text: "Real-time status tracking and progress monitoring" },
                { icon: Globe, text: "Comprehensive analytics and reporting dashboard" },
                { icon: Users, text: "Multi-authority dashboard support" },
                { icon: CheckCircle, text: "CSV bulk import functionality for authorities" }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-4 space-x-4 border bg-white/40 rounded-2xl border-white/60"
                  data-aos="fade-right"
                  data-aos-delay={500 + (index * 100)}
                >
                  <div className="bg-gradient-to-br from-[#8D153A] to-[#00534E] p-2 rounded-xl">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Section */}
          <div 
            className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-8 text-white"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <h2 className="mb-6 text-3xl font-bold text-center">Our Impact</h2>
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              <div data-aos="fade-up" data-aos-delay="600">
                <div className="text-3xl font-bold text-[#FFBE29] mb-2">10K+</div>
                <div className="text-white/90">Complaints Resolved</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="700">
                <div className="text-3xl font-bold text-[#FFBE29] mb-2">24h</div>
                <div className="text-white/90">Avg. Response Time</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="800">
                <div className="text-3xl font-bold text-[#FFBE29] mb-2">92%</div>
                <div className="text-white/90">Success Rate</div>
              </div>
              <div data-aos="fade-up" data-aos-delay="900">
                <div className="text-3xl font-bold text-[#FFBE29] mb-2">50+</div>
                <div className="text-white/90">Authorities Integrated</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div 
            className="p-8 text-center border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Get Involved</h2>
            <p className="max-w-2xl mx-auto mb-6 text-xl text-gray-700">
              Join thousands of citizens and authorities working together to build better communities across Sri Lanka.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/complaint/submit"
                className="bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white px-8 py-4 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                Submit Your First Complaint
              </a>
              <a
                href="/contact"
                className="px-8 py-4 font-bold text-gray-800 transition-all duration-500 transform border shadow-lg bg-white/60 backdrop-blur-md rounded-xl border-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;