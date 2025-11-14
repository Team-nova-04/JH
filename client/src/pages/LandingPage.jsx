import { Link } from 'react-router-dom';
import { Shield, Zap, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, userType } = useAuth();

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-20 w-20" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              CivicSense
            </h1>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              AI-Powered Public Complaint Management Platform
            </p>
            <p className="text-lg mb-12 text-primary-200 max-w-3xl mx-auto">
              Submit, track, and resolve public complaints efficiently. Our AI-powered system
              automatically routes your complaints to the right authority for faster resolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/complaint/submit"
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center"
                  >
                    Submit Complaint
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/citizen/register"
                    className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <Link
                  to={userType === 'citizen' ? '/citizen/dashboard' : '/authority/dashboard'}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Everything you need for efficient complaint management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose CivicSense?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Experience the future of public complaint management with our intelligent platform.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <Shield className="h-24 w-24 text-primary-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of citizens using CivicSense to make their voices heard.
                </p>
                <Link
                  to="/complaint/submit"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Submit Your First Complaint
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Submit a complaint or create an account to track your submissions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/complaint/submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Submit Complaint
            </Link>
            {!isAuthenticated && (
              <Link
                to="/citizen/register"
                className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

