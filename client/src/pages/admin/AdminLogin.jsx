import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validations';
import { useAuth } from '../../context/AuthContext';
import { Shield, Mail, Lock, Settings, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [loading, setLoading] = useState(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await adminLogin(data.email, data.password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen mt-[-20px] bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}${i % 3 === 0 ? '30' : '20'}, transparent)`,
              filter: 'blur(40px)',
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `#8D153A`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
            }}
          />
        ))}
      </div>

      <div 
        className="relative z-10 w-full max-w-md p-8 space-y-8 border shadow-2xl bg-white/20 backdrop-blur-md rounded-3xl border-white/40"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Header */}
        <div className="text-center" data-aos="fade-down" data-aos-delay="300">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-3 rounded-2xl shadow-lg">
                <Settings className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
            Admin Portal
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-700">
            Secure access to system administration
          </p>
        </div>

        {/* Security Notice */}
        <div 
          className="bg-[#00534E]/10 border border-[#00534E]/20 rounded-2xl p-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-[#00534E] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-[#00534E]">Restricted Access</p>
              <p>This portal is for authorized administrators only. All activities are monitored and logged.</p>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Input */}
            <div data-aos="fade-right" data-aos-delay="500">
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                Admin Email
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full pl-12 pr-4 py-3 bg-white/70 border-2 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                      errors.email ? 'border-red-300' : 'border-white/60'
                    }`}
                    placeholder="admin@civicsense.lk"
                  />
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div data-aos="fade-left" data-aos-delay="600">
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                Admin Password
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                  <input
                    {...register('password')}
                    type="password"
                    className={`w-full pl-12 pr-4 py-3 bg-white/70 border-2 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                      errors.password ? 'border-red-300' : 'border-white/60'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div data-aos="zoom-in" data-aos-delay="700">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  'Access Admin Dashboard'
                )}
              </span>
            </button>
          </div>

          {/* Admin Features */}
          <div 
            className="p-4 border bg-white/40 rounded-2xl border-white/60"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <p className="mb-3 text-sm font-semibold text-gray-700">Admin Capabilities:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-[#8D153A]" />
                <span>System Monitoring</span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="h-3 w-3 text-[#00534E]" />
                <span>User Management</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3 text-[#D97706]" />
                <span>Analytics & Reports</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3 text-[#8D153A]" />
                <span>Security Settings</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;