import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { complaintSchema } from '../utils/validations';
import { useAuth } from '../context/AuthContext';
import { complaintAPI } from '../api/api';
import { COMPLAINT_CATEGORIES } from '../utils/constants';
import { Upload, AlertCircle, MapPin, Folder, MessageSquare, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ComplaintSubmit = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(complaintSchema),
    defaultValues: {
      anonymous: !isAuthenticated,
    },
  });

  const isAnonymous = watch('anonymous');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('description', data.description);
      formData.append('location', data.location);
      if (data.category) formData.append('category', data.category);
      if (!isAnonymous && data.name) formData.append('name', data.name);
      if (!isAnonymous && data.phone) formData.append('phone', data.phone);
      if (imageFile) formData.append('image', imageFile);

      const res = await complaintAPI.submit(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Complaint submitted successfully!');
      navigate('/complaint/confirmation', { state: { complaint: res.data.data.complaint } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-[-20px] bg-gradient-to-br from-[#FEF3C7] via-[#ffeeab] to-[#ffedb1] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#FEF3C7' : '#FDE68A'}30, transparent)`,
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center" data-aos="fade-down">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-lg opacity-40"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-3">
            Submit a Complaint
          </h1>
          <p className="text-lg text-gray-700">
            Describe your issue and we'll route it to the appropriate authority
          </p>
        </div>

        {/* Form Container */}
        <div 
          className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Anonymous Toggle */}
            {isAuthenticated && (
              <div 
                className="flex items-center p-4 space-x-3 border bg-white/50 rounded-xl border-white/60"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <input
                  {...register('anonymous')}
                  type="checkbox"
                  id="anonymous"
                  className="h-5 w-5 text-[#8D153A] focus:ring-[#8D153A] border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                  Submit anonymously
                </label>
              </div>
            )}

            {/* Name and Phone (if not anonymous) */}
            {!isAnonymous && (
              <div 
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div>
                  <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 mr-2 text-[#8D153A]" />
                    Your Name (Optional)
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-[#8D153A]" />
                    Phone Number (Optional)
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            )}

            {/* Location */}
            <div data-aos="fade-up" data-aos-delay="400">
              <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-[#8D153A]" />
                Location <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                {...register('location')}
                type="text"
                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300 ${
                  errors.location ? 'border-red-300' : 'border-white/60'
                }`}
                placeholder="Street address, area, city..."
              />
              {errors.location && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Category */}
            <div data-aos="fade-up" data-aos-delay="500">
              <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                <Folder className="w-4 h-4 mr-2 text-[#8D153A]" />
                Category (Optional - AI will auto-detect)
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300"
              >
                <option value="">Auto-detect category</option>
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div data-aos="fade-up" data-aos-delay="600">
              <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                <MessageSquare className="w-4 h-4 mr-2 text-[#8D153A]" />
                Description <span className="ml-1 text-red-500">*</span>
              </label>
              <textarea
                {...register('description')}
                rows={6}
                className={`w-full px-4 py-3 bg-white/70 border rounded-xl focus:ring-2 focus:ring-[#8D153A] focus:border-transparent transition-all duration-300 ${
                  errors.description ? 'border-red-300' : 'border-white/60'
                }`}
                placeholder="Describe your complaint in detail. Be specific about the issue, when it occurred, and any other relevant information..."
              />
              {errors.description && (
                <p className="mt-2 text-sm font-medium text-red-600">{errors.description.message}</p>
              )}
              <p className="mt-2 text-xs font-medium text-gray-600">Minimum 10 characters required</p>
            </div>

            {/* Image Upload */}
            <div data-aos="fade-up" data-aos-delay="700">
              <label className="flex items-center block mb-3 text-sm font-semibold text-gray-700">
                <Upload className="w-4 h-4 mr-2 text-[#8D153A]" />
                Upload Image (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-white/60 border-dashed rounded-2xl bg-white/40 hover:border-[#8D153A]/40 transition-all duration-300 cursor-pointer">
                <div className="space-y-3 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="object-cover h-40 mx-auto shadow-lg rounded-xl" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="text-sm font-medium text-red-600 transition-colors duration-300 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600 sm:flex-row sm:space-y-0 sm:space-x-1">
                        <label className="relative cursor-pointer rounded-md font-semibold text-[#8D153A] hover:text-[#00534E] transition-colors duration-300">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="text-gray-600">or drag and drop</p>
                      </div>
                      <p className="text-xs font-medium text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div 
              className="bg-[#00534E]/10 border border-[#00534E]/20 rounded-2xl p-6"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-[#00534E] flex-shrink-0 mt-0.5" />
                <div className="text-gray-700">
                  <p className="font-semibold text-lg mb-2 text-[#00534E]">How it works:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#8D153A] font-bold mr-2">•</span>
                      Your complaint will be analyzed by AI for category and urgency
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#8D153A] font-bold mr-2">•</span>
                      It will be automatically routed to the appropriate authority
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#8D153A] font-bold mr-2">•</span>
                      You'll receive a confirmation with tracking details
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div data-aos="zoom-in" data-aos-delay="900">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Submitting Complaint...</span>
                  </div>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSubmit;