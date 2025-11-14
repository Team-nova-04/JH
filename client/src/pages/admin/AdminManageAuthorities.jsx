import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adminAPI } from '../../api/api';
import { AUTHORITY_ROLES, AUTHORITY_LABELS } from '../../utils/constants';
import { UserPlus, Users, Mail, Lock, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Authority Users</h1>
        <p className="text-gray-600 mt-1">Create and manage authority officer accounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Create New Authority User
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="officer@authority.gov"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Authority Role
              </label>
              <select
                {...register('role')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Authority</option>
                {Object.entries(AUTHORITY_ROLES).map(([key, value]) => (
                  <option key={value} value={value}>
                    {AUTHORITY_LABELS[value] || value}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                {...register('department')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Public Works Department"
              />
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Create Authority User</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Authority Roles
          </h2>
          <div className="space-y-3">
            {Object.entries(AUTHORITY_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{label}</span>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {key}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Each authority user can only view and manage complaints
              assigned to their specific authority role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageAuthorities;

