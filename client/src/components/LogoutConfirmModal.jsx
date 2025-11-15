import { LogOut, X, AlertTriangle, Shield, Lock } from 'lucide-react';

const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn" style={{ margin: 0, padding: '1rem' }}>
      {/* Enhanced Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60 backdrop-blur-md"
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      
      {/* Modal Container - Centered */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-modalSlideIn overflow-hidden mx-auto my-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-3xl opacity-20 blur-xl animate-pulse-slow" />
        
        {/* Content wrapper */}
        <div className="relative bg-white rounded-3xl">
          {/* Decorative top gradient bar */}
          <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 animate-gradient" />
          
          {/* Header with close button */}
          <div className="px-6 pt-6 pb-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-50 animate-pulse" />
                <div className="relative bg-gradient-to-br from-red-100 to-orange-100 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600 animate-wiggle" />
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Logout Confirmation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {/* Animated Icon */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                {/* Rotating ring */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-red-500 border-r-orange-500" />
                </div>
                {/* Pulsing outer circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-ping-slow" />
                {/* Main icon container */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-full shadow-2xl transform transition-transform hover:scale-110 duration-300">
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <LogOut className="w-10 h-10 text-red-600 animate-bounce-subtle" />
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-3 mb-6">
              <h4 className="text-xl font-bold text-gray-800 animate-fadeInUp">
                Are you sure you want to logout?
              </h4>
              {userName && (
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200 animate-fadeInUp animation-delay-100">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <p className="text-sm text-gray-700">
                    Logged in as <span className="font-bold text-blue-700">{userName}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Warning Info Box */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-400 p-4 rounded-xl mb-6 animate-fadeInUp animation-delay-200 shadow-inner">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Lock className="w-5 h-5 text-orange-600 animate-wiggle-slow" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-1">
                    Session will end
                  </p>
                  <p className="text-xs text-orange-800">
                    You'll need to login again to access your dashboard, submit complaints, and track your submissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fadeInUp animation-delay-300">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Cancel</span>
                </span>
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 via-red-600 to-orange-600 text-white font-semibold rounded-xl hover:from-red-600 hover:via-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 group relative overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center space-x-2">
                  <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Yes, Logout</span>
                </span>
              </button>
            </div>
          </div>

          {/* Footer decoration */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
