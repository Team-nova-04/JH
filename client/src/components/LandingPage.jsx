// pages/LandingPage.js - Completely redesigned with animations
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Shield,
  TrendingUp,
  Users,
  Zap,
  Award,
  Star,
  CheckCircle,
  MapPin,
  Clock,
  MessageCircle,
  BarChart3,
  Brain,
  Eye,
  Rocket,
  Sparkles,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import FloatingElement from "../components/FloatingElements";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Classification",
      description:
        "Smart categorization and urgency detection using advanced NLP algorithms",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure & Anonymous",
      description: "Report issues safely with optional anonymity protection",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Real-time Tracking",
      description: "Monitor complaint progress with live status updates",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Multi-Authority Coordination",
      description: "Seamless routing to relevant government departments",
      color: "from-orange-500 to-red-500",
    },
  ];

  const stats = [
    {
      value: "2,500+",
      label: "Issues Resolved",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      value: "15,000+",
      label: "Community Points",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      value: "500+",
      label: "Active Reporters",
      icon: Users,
      color: "text-blue-400",
    },
    {
      value: "95%",
      label: "Satisfaction Rate",
      icon: Award,
      color: "text-purple-400",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Report Issue",
      description: "Submit complaints with photos and location",
      icon: MessageCircle,
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Smart categorization and urgency detection",
      icon: Brain,
    },
    {
      number: "03",
      title: "Authority Routing",
      description: "Automatic assignment to relevant department",
      icon: Zap,
    },
    {
      number: "04",
      title: "Track & Resolve",
      description: "Real-time updates and status tracking",
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center mb-8">
              <FloatingElement>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur-lg opacity-75 animate-pulse"></div>
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4">
                    <span className="text-lg font-semibold text-white flex items-center justify-center space-x-2">
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                      <span>AI-Powered Civic Engagement Platform</span>
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                    </span>
                  </div>
                </div>
              </FloatingElement>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="text-white">Make Your</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Voice Heard
              </span>
            </h1>
            <p className="text-3xl lg:text-4xl font-bold text-yellow-300 mb-4">
              ඔබේ හඬ වැදගත්ය
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className="text-2xl lg:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transform community issues into{" "}
              <span className="font-semibold text-white">
                actionable solutions
              </span>{" "}
              with our intelligent complaint management system powered by{" "}
              <span className="font-semibold text-yellow-300">
                artificial intelligence
              </span>
              .
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              {!isAuthenticated ? (
                <>
                  <FloatingElement>
                    <Link
                      to="/citizen/register"
                      className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-2xl transform group-hover:scale-110 transition-transform duration-500"></div>
                      <span className="relative">🚀 Start Reporting Now</span>
                    </Link>
                  </FloatingElement>
                  <Link
                    to="/about"
                    className="group border-2 border-white/50 text-white hover:bg-white/10 px-12 py-6 rounded-2xl font-bold text-xl backdrop-blur-sm transition-all duration-500 hover:border-white hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Learn More</span>
                    </span>
                  </Link>
                </>
              ) : (
                <FloatingElement>
                  <Link
                    to="/complaint/submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    🎯 Report New Issue
                  </Link>
                </FloatingElement>
              )}
            </div>
          </AnimatedSection>

          {/* Animated Stats */}
          <AnimatedSection delay={1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <FloatingElement key={index} delay={index * 0.2}>
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-blue-200 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </FloatingElement>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <FloatingElement duration={1.5}>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                How{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  It Works
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                Simple steps to transform your community concerns into resolved
                issues
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-y-8"></div>

            {processSteps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="text-center group relative">
                  {/* Step Number with Animation */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <span className="text-2xl font-black text-white">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-lg border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                      <step.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Powerful{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                Everything you need for efficient and intelligent complaint
                management
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative">
                    {/* Icon with Gradient Background */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                        <div
                          className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl text-white transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <feature.icon className="h-8 w-8" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
              Ready to Make a{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
                Difference
              </span>
              ?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Join thousands of proactive citizens who are already transforming
              their communities through CivicSense.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <FloatingElement>
                    <Link
                      to="/citizen/register"
                      className="group bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                    >
                      <span className="flex items-center space-x-3">
                        <Rocket className="h-6 w-6" />
                        <span>Create Your Account</span>
                      </span>
                    </Link>
                  </FloatingElement>
                  <Link
                    to="/complaint/submit"
                    className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-6 rounded-2xl font-black text-xl backdrop-blur-sm transition-all duration-500 hover:scale-105"
                  >
                    <span className="flex items-center space-x-3">
                      <Zap className="h-6 w-6" />
                      <span>Report Issue Now</span>
                    </span>
                  </Link>
                </>
              ) : (
                <FloatingElement>
                  <Link
                    to="/complaint/submit"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    🎯 Report New Issue
                  </Link>
                </FloatingElement>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
