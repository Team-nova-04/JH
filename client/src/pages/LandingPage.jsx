import { Link } from 'react-router-dom';
import { Shield, Zap, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import conceptArt from "../assets/Concept Art.jpg";

const LandingPage = () => {
  const { isAuthenticated, userType } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Classification',
      description: 'Automatic complaint categorization and urgency detection using advanced NLP.',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track complaint trends and get insights into public issues.',
    },
    {
      icon: Users,
      title: 'Multi-Authority Support',
      description: 'Seamless routing to the right department for faster resolution.',
    },
    {
      icon: Shield,
      title: 'Secure & Anonymous',
      description: 'Submit complaints anonymously or with your account for tracking.',
    },
  ];

  const benefits = [
    'Fast complaint submission',
    'Automatic authority routing',
    'Real-time status tracking',
    'Anonymous option available',
    'AI-powered urgency detection',
    'Multi-category support',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Sri Lankan Background */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Sri Lankan Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${conceptArt})`,
            }}
          />
          {/* Radiant Sri Lankan Flag Colors Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8D153A] via-[#FFBE29] to-[#00534E] opacity-80 backdrop-blur-[1px]"></div>
          {/* Additional radial gradient for radiant effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/20"></div>
        </div>

        {/* Radiant Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#FFBE29' : i % 3 === 1 ? '#8D153A' : '#00534E'
                }40, transparent)`,
                boxShadow: `0 0 20px ${
                  i % 3 === 0 ? '#FFBE29' : i % 3 === 1 ? '#8D153A' : '#00534E'
                }40`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center text-white sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8" data-aos="fade-down">
            <div className="relative">
              <div className="absolute rounded-full -inset-4 bg-gradient-to-r from-[#FFBE29] via-[#8D153A] to-[#00534E] blur-xl opacity-60"></div>
              <div className="relative p-5 border-2 shadow-2xl rounded-2xl bg-white/15 backdrop-blur-lg border-white/40">
                <Shield className="w-20 h-20 text-[#FFBE29] drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <h1 
            className="mb-6 text-6xl font-bold md:text-7xl font-poppins"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="text-transparent bg-gradient-to-r from-[#FFBE29] via-[#FFFFFF] to-[#FFBE29] bg-clip-text drop-shadow-8xl">
              CivicSense
            </span>
          </h1>
          
          <p 
            className="mb-6 text-3xl font-bold md:text-4xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="text-[#ffffff] drop-shadow-md bg-clip-text">
              AI-Powered Public Complaint Management
            </span>
          </p>
          
          <p 
            className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-white/90 drop-shadow-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Submit, track, and resolve public complaints efficiently. Our AI-powered system
            automatically routes your complaints to the right authority for faster resolution.
          </p>
          
          <div 
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {!isAuthenticated ? (
              <>
                <Link
                  to="/complaint/submit"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#FFBE29] to-[#FFD700] text-[#8D153A] px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl flex items-center justify-center text-lg min-w-[220px] shadow-2xl border-2 border-[#FFBE29]/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Submit Complaint</span>
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                
                <Link
                  to="/citizen/register"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#8D153A] to-[#A52D5A] text-white px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl border-2 border-white/30 backdrop-blur-sm min-w-[220px] text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                  <span className="relative z-10">Create Account</span>
                </Link>
              </>
            ) : (
              <Link
                to={userType === 'citizen' ? '/citizen/dashboard' : '/authority/dashboard'}
                className="group relative overflow-hidden bg-gradient-to-r from-[#FFBE29] to-[#FFD700] text-[#8D153A] px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl flex items-center justify-center text-lg min-w-[220px] shadow-2xl border-2 border-[#FFBE29]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                <span className="relative z-10">Go to Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute z-10 transform -translate-x-1/2 bottom-8 left-1/2" data-aos="fade-up" data-aos-delay="600">
          <div className="animate-bounce">
            <div className="flex justify-center w-8 h-12 border-2 border-[#FFBE29] rounded-full shadow-lg">
              <div className="w-1 h-4 mt-3 bg-[#FFBE29] rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50/80">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-20 text-center" data-aos="fade-up">
            <h2 className="mb-4 text-5xl font-bold text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FFD700] bg-clip-text">
              Key Features
            </h2>
            <p className="text-2xl font-medium text-gray-600">Everything you need for efficient complaint management</p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-8 border shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200/60 rounded-3xl"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className="flex items-center justify-center mb-6 bg-gradient-to-br from-[#FF8C00] to-[#FFD700] w-16 h-16 rounded-2xl shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-transparent bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text">
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-[#8D153A]/10 via-[#FFBE29]/10 to-[#00534E]/10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div data-aos="fade-right">
              <h2 className="mb-8 text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
                Why Choose CivicSense?
              </h2>
              <p className="mb-10 text-xl font-medium leading-relaxed text-gray-600">
                Experience the future of public complaint management with our intelligent platform designed to make civic engagement seamless and effective.
              </p>
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className="flex items-center p-4 space-x-5 transition-all duration-300 border rounded-2xl bg-white/60 backdrop-blur-sm border-gray-200/50 hover:shadow-lg hover:border-transparent"
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#00534E] to-[#008080] rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div 
              className="relative p-12 border bg-gradient-to-br from-white to-gray-50/80 border-gray-200/60 shadow-3xl rounded-3xl backdrop-blur-sm"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFBE29] to-transparent rounded-full blur-2xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00534E] to-transparent rounded-full blur-2xl opacity-20"></div>
              
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#FFBE29]/20 to-[#FFBE29]/5 rounded-3xl shadow-lg">
                  <Shield className="w-12 h-12 text-[#8D153A]" />
                </div>
                <h3 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
                  Get Started Today
                </h3>
                <p className="mb-10 text-lg font-medium leading-relaxed text-gray-600">
                  Join thousands of citizens using CivicSense to make their voices heard and create positive change in their communities.
                </p>
                <Link
                  to="/complaint/submit"
                  className="inline-block px-10 py-5 text-lg font-bold text-white transition-all duration-500 transform bg-gradient-to-r from-[#8D153A] to-[#A52D5A] rounded-2xl shadow-2xl hover:-translate-y-2 hover:shadow-3xl hover:from-[#A52D5A] hover:to-[#8D153A]"
                >
                  Submit Your First Complaint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-white bg-gradient-to-br from-[#8D153A] via-[#EB7400] to-[#00534E] relative overflow-hidden">
        {/* Radiant background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFBE29] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00534E] rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-5xl font-bold" data-aos="fade-up">
            Ready to Get Started?
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-2xl font-semibold text-[#FFBE29] drop-shadow-lg" data-aos="fade-up" data-aos-delay="100">
            Join our growing community of active citizens and authorities working together to build better communities.
          </p>
          <div 
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              to="/complaint/submit"
              className="group relative overflow-hidden bg-gradient-to-r from-[#FFBE29] to-[#FFD700] text-[#8D153A] px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl shadow-2xl border-2 border-[#FFBE29]/50 min-w-[220px] text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10">Submit Complaint</span>
            </Link>
            
            {!isAuthenticated && (
              <Link
                to="/citizen/register"
                className="group relative overflow-hidden bg-white/20 backdrop-blur-lg text-white px-10 py-5 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-2 hover:shadow-3xl border-2 border-white/40 min-w-[220px] text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                <span className="relative z-10">Create Account</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          33% {
            transform: translateY(-30px) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translateY(-15px) rotate(240deg) scale(0.9);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;