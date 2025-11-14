import { Shield, Target, Users, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About CivicSense</h1>
            <p className="text-xl text-gray-600">
              Empowering citizens through AI-powered complaint management
            </p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                CivicSense is an innovative platform designed to bridge the gap between citizens
                and public authorities. We leverage artificial intelligence and natural language
                processing to streamline the complaint submission and resolution process.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to make public service more accessible, transparent, and efficient by
                providing a user-friendly platform that automatically routes complaints to the
                appropriate authorities and prioritizes urgent issues.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">1. Submit Your Complaint</h3>
                    <p className="text-gray-700">
                      Citizens can submit complaints either anonymously or with an account. Simply
                      describe your issue, provide location details, and optionally upload images.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2. AI Processing</h3>
                    <p className="text-gray-700">
                      Our AI system analyzes your complaint using sentiment analysis and
                      zero-shot classification to determine the category, urgency level, and assign
                      it to the appropriate authority.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">3. Authority Resolution</h3>
                    <p className="text-gray-700">
                      Assigned authorities receive the complaint, can update its status, add notes,
                      and work towards resolution. Citizens can track the progress of their
                      complaints.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>AI-powered complaint classification and urgency detection</li>
                <li>Automatic routing to appropriate authorities</li>
                <li>Support for multiple complaint categories</li>
                <li>Anonymous complaint submission option</li>
                <li>Real-time status tracking</li>
                <li>Comprehensive analytics and reporting</li>
                <li>Multi-authority dashboard support</li>
                <li>CSV bulk import functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For questions, support, or feedback, please visit our{' '}
                <a href="/contact" className="text-primary-600 hover:underline">
                  contact page
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

