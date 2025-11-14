// pages/AboutPage.js - Completely redesigned About section
import { 
  Shield, 
  Target, 
  Users, 
  Zap, 
  Globe,
  Heart,
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import FloatingElement from '../components/FloatingElements';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Open and honest communication between citizens and authorities",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Efficiency",
      description: "Streamlined processes for faster issue resolution",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Empowering citizens to actively participate in civic improvement",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging AI and technology for smarter solutions",
      color: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    { year: "2023", event: "CivicSense Platform Launch", description: "Revolutionizing public complaint management" },
    { year: "2024", event: "AI Integration", description: "Implemented advanced NLP for smart classification" },
    { year: "2024", event: "Mobile App Release", description: "Expanded accessibility with mobile platform" },
    { year: "2025", event: "National Expansion", description: "Scaling to serve communities nationwide" }
  ];

  const teamStats = [
    { number: "50K+", label: "Citizens Served", icon: Users },
    { number: "25+", label: "Cities Covered", icon: Globe },
    { number: "95%", label: "Satisfaction Rate", icon: Heart },
    { number: "2H", label: "Avg. Response Time", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero About Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-128 h-128 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-6xl lg:text-8xl font-black mb-8">
                About <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">CivicSense</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                We're on a mission to bridge the gap between citizens and local authorities through 
                <span className="font-semibold text-white"> intelligent technology</span> and 
                <span className="font-semibold text-yellow-300"> community empowerment</span>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
                
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                  <Target className="h-12 w-12 text-yellow-300 mb-6" />
                  <h2 className="text-4xl font-black mb-4">Our Mission</h2>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    To create seamless, transparent, and efficient channels for civic engagement, 
                    empowering every citizen to contribute to community development through 
                    innovative AI-powered solutions.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-purple-400 rounded-full opacity-20"></div>
                
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                  <Globe className="h-12 w-12 text-yellow-300 mb-6" />
                  <h2 className="text-4xl font-black mb-4">Our Vision</h2>
                  <p className="text-xl text-green-100 leading-relaxed">
                    A world where every community concern is heard, addressed, and resolved efficiently, 
                    creating smarter, more responsive cities through collaborative civic technology.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Values</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                The principles that guide everything we do at CivicSense
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200">
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 bg-gradient-to-br ${value.color} rounded-2xl text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                By The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Numbers</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                The impact we've made together with our community
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <FloatingElement delay={index * 0.2}>
                  <div className="text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-lg font-medium">
                      {stat.label}
                    </div>
                  </div>
                </FloatingElement>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-black mb-6">
                Our <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-2xl text-blue-100 max-w-3xl mx-auto font-light">
                Milestones in our mission to transform civic engagement
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 pr-8 pl-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <div className="text-yellow-300 text-sm font-bold mb-2">{milestone.year}</div>
                        <h3 className="text-2xl font-black mb-2">{milestone.event}</h3>
                        <p className="text-blue-100">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-lg"></div>
                      {index < milestones.length - 1 && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-yellow-400"></div>
                      )}
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              Join Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mission</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Be part of the movement that's transforming how communities and authorities work together.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <FloatingElement>
                <a
                  href="/complaint/submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  🚀 Report Your First Issue
                </a>
              </FloatingElement>
              <a
                href="/contact"
                className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-12 py-6 rounded-2xl font-black text-xl transition-all duration-500 hover:scale-105"
              >
                📞 Get In Touch
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;