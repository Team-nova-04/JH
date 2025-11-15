import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminAPI } from '../../api/api';
import { AUTHORITY_ROLES, AUTHORITY_LABELS } from '../../utils/constants';
import { UserPlus, Users, Mail, Lock, Building2, Shield, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const authoritySchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(Object.values(AUTHORITY_ROLES), 'Invalid role').required('Role is required'),
  department: yup.string().required('Department is required'),
});

const AdminManageAuthorities = () => {
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(authoritySchema),
  });

  useEffect(() => {
    // In a real app, you'd fetch existing authorities
    // For now, we'll just show the form
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await adminAPI.createAuthorityUser(data);
      toast.success('Authority user created successfully');
      reset();
      // Refresh list if you have an endpoint
    } catch (error) {
      // Error toast is already handled by axios interceptor
      // Only log for debugging
      console.error('Error creating authority user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Users className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Manage Authority Users
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Create and manage authority officer accounts for efficient complaint resolution
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Create Form */}
          <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
              <UserPlus className="h-8 w-8 mr-3 text-[#8D153A]" />
              Create New Authority User
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                    <input
                      {...register('name')}
                      type="text"
                      className={`w-full pl-12 pr-4 py-3 bg-white/70 border-2 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                        errors.name ? 'border-red-300' : 'border-white/60'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm font-medium text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Email Address
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
                      placeholder="officer@authority.gov.lk"
                    />
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Password
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

              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Authority Role
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                    <select
                      {...register('role')}
                      className={`w-full pl-12 pr-4 py-3 bg-white/70 border-2 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 backdrop-blur-sm transition-all duration-300 ${
                        errors.role ? 'border-red-300' : 'border-white/60'
                      }`}
                    >
                      <option value="">Select Authority Type</option>
                      {Object.entries(AUTHORITY_ROLES).map(([key, value]) => (
                        <option key={value} value={value}>
                          {AUTHORITY_LABELS[value] || value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm font-medium text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Department
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8D153A]" />
                    <input
                      {...register('department')}
                      type="text"
                      className={`w-full pl-12 pr-4 py-3 bg-white/70 border-2 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent text-gray-800 placeholder-gray-600 backdrop-blur-sm transition-all duration-300 ${
                        errors.department ? 'border-red-300' : 'border-white/60'
                      }`}
                      placeholder="e.g., Public Works Department"
                    />
                  </div>
                </div>
                {errors.department && (
                  <p className="mt-2 text-sm font-medium text-red-600">{errors.department.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Creating Authority User...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Authority User</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="space-y-8">
            <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
              <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
                <Building2 className="h-8 w-8 mr-3 text-[#00534E]" />
                Authority Roles & Permissions
              </h2>
              <div className="space-y-4">
                {Object.entries(AUTHORITY_LABELS).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-4 border bg-white/40 rounded-2xl border-white/60">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-[#8D153A]" />
                      <span className="font-semibold text-gray-800">{label}</span>
                    </div>
                    <span className="text-sm font-medium text-[#00534E] bg-[#00534E]/10 px-3 py-1 rounded-full">
                      {key}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="flex items-center mb-4 text-xl font-bold">
                <CheckCircle className="h-6 w-6 mr-2 text-[#FFBE29]" />
                Authority User Capabilities
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFBE29] rounded-full"></div>
                  <span>View assigned complaints based on authority role</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFBE29] rounded-full"></div>
                  <span>Update complaint status and add resolution notes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFBE29] rounded-full"></div>
                  <span>Access real-time complaint analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFBE29] rounded-full"></div>
                  <span>Communicate with citizens about their complaints</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FFBE29] rounded-full"></div>
                  <span>Generate reports for assigned complaint categories</span>
                </li>
              </ul>
            </div>

            {/* Security Note */}
            <div className="bg-[#00534E]/10 border border-[#00534E]/20 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-[#00534E] flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <p className="font-semibold text-[#00534E] mb-1">Security Note</p>
                  <p className="text-sm">
                    Each authority user can only access complaints assigned to their specific authority role. 
                    All activities are logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageAuthorities;