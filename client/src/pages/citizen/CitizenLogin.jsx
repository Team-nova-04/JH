import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validations";
import { useAuth } from "../../context/AuthContext";
import { Shield, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

const CitizenLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { citizenLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/citizen/dashboard";

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
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
    const result = await citizenLogin(data.email, data.password);
    setLoading(false);

    if (result.success) {
      // Redirect back to where user came from, or dashboard
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen mt-[-30px] bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Glowing Background */}
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
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "#FEF3C7" : "#FDE68A"
              }${i % 3 === 0 ? "40" : "30"}, transparent)`,
              filter: "blur(40px)",
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
        className="relative z-10 w-full max-w-md p-8 space-y-8 border shadow-xl bg-white/20 backdrop-blur-md rounded-3xl border-white/30"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Header */}
        <div className="text-center" data-aos="fade-down" data-aos-delay="300">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-lg opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-[#FCD34D] to-[#FDE68A] p-3 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-[#8D153A]" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text">
            Citizen Login
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-700">
            Sign in to your account to track your complaints
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {/* Email Input */}
            <div data-aos="fade-right" data-aos-delay="400">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full pl-12 pr-4 py-3 bg-white/60 border-2 rounded-xl focus:ring-2 focus:ring-[#FCD34D] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                      errors.email ? "border-red-400" : "border-white/40"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div data-aos="fade-left" data-aos-delay="500">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                  <input
                    {...register("password")}
                    type="password"
                    className={`w-full pl-12 pr-4 py-3 bg-white/60 border-2 rounded-xl focus:ring-2 focus:ring-[#FCD34D] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                      errors.password ? "border-red-400" : "border-white/40"
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm font-medium text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div data-aos="zoom-in" data-aos-delay="600">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-3 px-4 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </span>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="700">
            <span className="text-sm text-gray-700">
              Don't have an account?{" "}
            </span>
            <Link
              to="/citizen/register"
              className="text-[#8D153A] hover:text-[#00534E] font-semibold transition-colors duration-300 hover:underline"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
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
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
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

export default CitizenLogin;
