import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, MapPin, AlertTriangle, Shield } from 'lucide-react';
import { AUTHORITY_LABELS, getUrgencyLevel, URGENCY_LABELS, URGENCY_COLORS } from '../utils/constants';

const ComplaintConfirmation = () => {
  const location = useLocation();
  const complaint = location.state?.complaint;

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No complaint data found</p>
          <Link to="/complaint/submit" className="text-primary-600 hover:underline">
            Submit a new complaint
          </Link>
        </div>
      </div>
    );
  }

  const urgencyLevel = getUrgencyLevel(complaint.urgencyScore || 0);
  const urgencyColor = URGENCY_COLORS[urgencyLevel] || URGENCY_COLORS.normal;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaint Submitted Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Your complaint has been received and is being processed
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Complaint ID</p>
                <p className="text-lg font-semibold text-gray-900">{complaint.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{complaint.location}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-gray-900 capitalize">{complaint.category || 'Auto-detected'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Urgency Level</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-medium border ${urgencyColor} mt-1`}>
                  {URGENCY_LABELS[urgencyLevel]} ({(complaint.urgencyScore * 100).toFixed(0)}%)
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned Authority</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Shield className="h-4 w-4 text-primary-600" />
                  <p className="text-gray-900">
                    {AUTHORITY_LABELS[complaint.assignedAuthority] || complaint.assignedAuthority}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-gray-900 capitalize">{complaint.status}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">What happens next?</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The assigned authority will review your complaint</li>
                  <li>You can track the status if you're logged in</li>
                  <li>Updates will be provided as the complaint is processed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/complaint/submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Submit Another Complaint
            </Link>
            <Link
              to="/citizen/dashboard"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintConfirmation;

